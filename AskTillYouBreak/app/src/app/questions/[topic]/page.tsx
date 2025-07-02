"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Question, Answer } from "@/types";
import { genQuestion } from "@/utils/questionGen";
import NarutoRun from "@/components/NarutoRun";
import { update } from "@/utils/stats";
import Back from "@/components/Back";
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
    update(topic, correct);
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
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <Back />
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 text-center">
          <div className="text-xs sm:text-sm text-gray-400 mb-2">
            Questions answered: {answers.length} / ∞
          </div>
        </div>
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-400 capitalize">
            {topic}
          </h1>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 shadow-lg">
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 leading-relaxed">
            {currentQuestion.text}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                disabled={!!feedback}
                onClick={() => setSelectedAnswer(option)}
                className={`p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                  selectedAnswer === option
                    ? "border-purple-500 bg-purple-900/30"
                    : "border-gray-600 hover:border-gray-400 hover:bg-gray-700/50"
                } ${!!feedback ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span className="font-medium text-purple-300 mr-2">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleAnswer}
          disabled={!selectedAnswer || !!feedback}
          className="w-full px-6 py-3 sm:py-4 bg-purple-600 rounded-lg font-semibold text-sm sm:text-base lg:text-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Submit Answer
        </button>
        {feedback && (
          <div className={`mt-4 sm:mt-6 text-center p-4 rounded-lg ${
            feedback.correct 
              ? "bg-green-900/30 border border-green-500/50" 
              : "bg-red-900/30 border border-red-500/50"
          }`}>
            <div className={`text-lg sm:text-xl font-bold mb-2 ${
              feedback.correct ? "text-green-400" : "text-red-400"
            }`}>
              {feedback.correct ? "🎉 Correct!" : "❌ Incorrect"}
            </div>
            {!feedback.correct && feedback.correctAnswer && (
              <div className="text-sm sm:text-base text-gray-300">
                Correct answer: <span className="font-semibold text-green-400">{feedback.correctAnswer}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}