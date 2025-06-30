from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from g4f import Client
import os
from dotenv import load_dotenv
import json
from fastapi.middleware.cors import CORSMiddleware
import re
import asyncio
from concurrent.futures import ThreadPoolExecutor


load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Client()
executor = ThreadPoolExecutor(max_workers=43)

class Answer(BaseModel):
    questionId: str
    questionText: str
    userAnswer: str
    topic: str

class Question(BaseModel):
    id: str
    text: str
    topic: str
    difficulty: str
    options: Optional[List[str]] = None
    correctAnswer: Optional[str] = None

class QuestionRequest(BaseModel):
    topic: str
    previousAnswers: List[Answer]
    count: int = 10

@app.get("/")
async def root():
    return {"message": "Working!"}

@app.post("/questions/generate")
async def generate_questions(request: QuestionRequest):
    try:
        context = ""
        if request.previousAnswers:
            context = "Previous answers:\n"
            for answer in request.previousAnswers[-3:]:
                context += f"Q: {answer.questionText}\nA: {answer.userAnswer}\n\n"
        prompt = f"""Generate {request.count} {request.topic} questions that are engaging and challenging.
        {context}
        Based on the previous answers, adapt the difficulty and style of questions to challenge the user more.

        Return a JSON array of questions with this exact format:
        [
            {{
                "id": "unique_id",
                "text": "Question text?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option B",
                "topic": "{request.topic}",
                "difficulty": "easy"
            }}
        ]
        Make questions progressively harder and more thought-provoking.
        Difficulty should be ('easy' | 'medium' | 'hard').
        """
        loop = asyncio.get_event_loop()

        resp = await loop.run_in_executor(
            executor,
            lambda: client.chat.completions.create(
                model="phi-4",
                messages=[
                    {"role": "system", "content": "You are a question generator that creates engaging, educational questions. Always respond with valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                max_tokens=2000
            )
        )
        questions_text = resp.choices[0].message.content.strip()
        print(f"Generated questions: {questions_text}")
        if questions_text.startswith("```"):
            questions_text = re.sub(r"^```[a-zA-Z]*\n?", "", questions_text)
            questions_text = questions_text.rstrip("`").rstrip()
        start = questions_text.find('[')
        end = questions_text.rfind(']') + 1
        if start != -1 and end > start:
            json_str = questions_text[start:end]
        else:
            start = questions_text.find('[')
            if start != -1:
                json_str = questions_text[start:]
        try:
            questions_data = json.loads(json_str)
        except json.JSONDecodeError:
            last_obj = json_str.rfind('}')
            if last_obj != -1:
                fixed = json_str[:last_obj+1]
                fixed = re.sub(r',\s*$', '', fixed)
                if not fixed.strip().endswith(']'):
                    fixed += ']'
                if not fixed.strip().startswith('['):
                    fixed = '[' + fixed
                try:
                    questions_data = json.loads(fixed)
                except Exception as err:
                    raise HTTPException(status_code=500, detail=str(err))
            else:
                raise HTTPException(status_code=500, detail="failed")

        return {"questions": questions_data}

    except Exception as err:
        print(str(err))
        raise HTTPException(status_code=500, detail=str(err))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)