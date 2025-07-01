"use client";

import { useState, useEffect } from "react";
import { get, reset, getTop, bestAccuracy } from "@/utils/stats";
import type { UserStats } from "@/utils/stats";
import NavBar from "@/components/Navbar";
import Link from "next/link";

export default function StatsPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setStats(get());
  }, []);

  const handleResetStats = () => {
    reset();
    setStats(get());
    setShowResetConfirm(false);
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return "text-green-400";
    if (accuracy >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading stats...</div>
      </div>
    );
  }

  const topTopics = getTop(5);
  const bestAccuracyTopics = bestAccuracy(5);

  return (
    <div>
      <NavBar>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </NavBar>
      <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">Your Quiz Statistics</h1>
            <p className="text-gray-400">&ldquo;Those who do not understand true pain can never understand true peace.&rdquo; - Naruto</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.attempted}</div>
              <div className="text-gray-400">Questions Attempted</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{stats.correct}</div>
              <div className="text-gray-400">Correct Answers</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getAccuracyColor(stats.accuracy)}`}>
                {stats.accuracy.toFixed(1)}%
              </div>
              <div className="text-gray-400">Overall Accuracy</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.topicStats.length}</div>
              <div className="text-gray-400">Topics Explored</div>
            </div>
          </div>

          {stats.attempted === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">No quiz data yet!</h2>
              <p className="text-gray-400 mb-6">Start taking quizzes to see your statistics here.</p>
              <Link href="/">
                <button className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors">
                  Take Your First Quiz
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-purple-400">Most Played Topics</h3>
                  {topTopics.length > 0 ? (
                    <div className="space-y-3">
                      {topTopics.map((topic) => (
                        <div key={topic.topic} className="flex justify-between items-center">
                          <span className="capitalize">{topic.topic}</span>
                          <span className="text-gray-400">{topic.attempted} questions</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No data available</p>
                  )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Best Accuracy</h3>
                  {bestAccuracyTopics.length > 0 ? (
                    <div className="space-y-3">
                      {bestAccuracyTopics.map((topic) => (
                        <div key={topic.topic} className="flex justify-between items-center">
                          <span className="capitalize">{topic.topic}</span>
                          <span className={getAccuracyColor(topic.accuracy)}>
                            {topic.accuracy.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Play at least 5 questions in a topic to see accuracy</p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  Reset All Stats
                </button>
              </div>

              {showResetConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-4">
                    <h3 className="text-xl font-semibold mb-4">Confirm Reset</h3>
                    <p className="text-gray-400 mb-6">Are you sure you want to reset all your statistics? This action cannot be undone.</p>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleResetStats}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}