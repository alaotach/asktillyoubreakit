"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Question, Answer } from "@/types";
import { genQuestion } from "@/utils/questionGen";
import NarutoRun from "@/components/NarutoRun";
export default function QuestionPage() {
  const params = useParams();
  const topic = params.topic as string;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<null | { correct: boolean; correctAnswer?: string }>(null);
  const [preloading, setPreloading] = useState(false);
  const preloadRef = useRef(false);

  useEffect(() => {
    setLoading(true);
    genQuestion(topic, answers, 30).then(newQuestions => {
      const filtered = newQuestions.filter(q => Array.isArray(q.options) && q.options.length > 0);
      setQuestions(filtered);
      setCurrentQuestionIndex(0);
      setLoading(false);
    });
  }, [topic]);

  useEffect(() => {
    if (
      !preloading &&
      questions.length - currentQuestionIndex <= 30 &&
      !loading &&
      !preloadRef.current
    ) {
      setPreloading(true);
      preloadRef.current = true;
      genQuestion(topic, answers, 30).then(newQuestions => {
        const filtered = newQuestions.filter(q => Array.isArray(q.options) && q.options.length > 0);
        setQuestions(prev => [...prev, ...filtered]);
        setPreloading(false);
        preloadRef.current = false;
      });
    }
  }, [currentQuestionIndex, questions.length, loading]);

  const handleAnswer = () => {
    if (!selectedAnswer) return;
    const currentQuestion = questions[currentQuestionIndex];

    let correct = false;
    let correctAnswer = "";
    if (currentQuestion.correctAnswer) {
      correctAnswer = currentQuestion.correctAnswer;
      correct = selectedAnswer === correctAnswer;
    }

    setFeedback({ correct, correctAnswer });
    const answer: Answer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      userAnswer: selectedAnswer,
      timestamp: new Date(),
      topic: topic
    };
    setAnswers(prev => [...prev, answer]);
  };

  useEffect(() => {
    if (feedback !== null) {
      const timer = setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer("");
        setCurrentQuestionIndex(idx => idx + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  if (loading) {
    return <NarutoRun />;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No more questions. Try another topic!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 text-center text-sm text-gray-400">
        Questions answered: {answers.length} / {questions.length}
        </div>
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl mb-4">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                disabled={!!feedback}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full p-3 text-left rounded border-2 transition-all ${
                  selectedAnswer === option
                    ? "border-purple-500 bg-purple-900/30"
                    : "border-gray-600 hover:border-gray-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnswer}
          disabled={!selectedAnswer || !!feedback}
          className="w-full px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>

        {feedback && (
          <div className={`mt-6 text-center text-lg font-bold ${feedback.correct ? "text-green-400" : "text-red-400"}`}>
            {feedback.correct ? "Correct!" : `Incorrect. Correct answer: ${feedback.correctAnswer}`}
          </div>
        )}
      </div>
    </div>
  );
}