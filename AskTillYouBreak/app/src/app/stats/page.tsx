"use client"
import { useState, useEffect } from "react";
import { get, reset, save, update, getTop, bestAccuracy, UserStats } from "@/utils/stats";
import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
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
  const bezztAccuracy = bestAccuracy(5);
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
                <p className="text-gray-400">"Those who do not understand true pain can never understand true peace." - Naruto</p>
            </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.attempted}</div>
              <div className="text-gray-400 text-sm">Total Questions</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">{stats.correct}</div>
              <div className="text-gray-400 text-sm">Correct Answers</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className={`text-2xl sm:text-3xl font-bold ${getAccuracyColor(stats.accuracy)}`}>
                {stats.accuracy.toFixed(1)}%
              </div>
              <div className="text-gray-400 text-sm">Overall Accuracy</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.topicStats.length}</div>
              <div className="text-gray-400 text-sm">Topics Played</div>
            </div>
          </div>
          {stats.attempted === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold mb-4">No Stats Yet</h2>
              <p className="text-gray-400 mb-6">Start playing some quizzes to see your statistics here!</p>
              <Link href="/">
                <button className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                  Start Playing
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-purple-400">Most Played Topics</h2>
                  {topTopics.length > 0 ? (
                    <div className="space-y-3">
                      {topTopics.map((topic, index) => (
                        <div key={topic.topic} className="flex items-center justify-between bg-gray-700 rounded p-3">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold capitalize">{topic.topic}</div>
                              <div className="text-xs text-gray-400">
                                {topic.attempted} questions • {topic.accuracy.toFixed(1)}% accuracy
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    ) : (
                    <p className="text-gray-400">No data yet</p>
                  )}
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-green-400">Best Accuracy</h2>
                  {bezztAccuracy.length > 0 ? (
                    <div className="space-y-3">
                      {bezztAccuracy.map((topic: any, index: any) => (
                        <div key={topic.topic} className="flex items-center justify-between bg-gray-700 rounded p-3">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold capitalize">{topic.topic}</div>
                              <div className="text-xs text-gray-400">
                                {topic.correct}/{topic.attempted} correct
                              </div>
                            </div>
                          </div>
                          <div className={`font-bold ${getAccuracyColor(topic.accuracy)}`}>
                            {topic.accuracy.toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Play at least 5 questions in a topic to see accuracy rankings</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-purple-400">All Topics</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2">Topic</th>
                        <th className="text-center py-2">Attempted</th>
                        <th className="text-center py-2">Correct</th>
                        <th className="text-center py-2">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.topicStats.map((topic) => (
                        <tr key={topic.topic} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                          <td className="py-3 font-medium capitalize">{topic.topic}</td>
                          <td className="text-center py-3">{topic.attempted}</td>
                          <td className="text-center py-3 text-green-400">{topic.correct}</td>
                          <td className={`text-center py-3 font-bold ${getAccuracyColor(topic.accuracy)}`}>
                            {topic.accuracy.toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center space-y-4">
                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                  >
                    Reset All Stats
                  </button>
                ) : (
                  <div className="bg-gray-800 rounded-lg p-4 max-w-md mx-auto">
                    <p className="mb-4 text-yellow-400">Are you sure? This action cannot be undone.</p>
                    <div className="space-x-4">
                      <button
                        onClick={handleResetStats}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={() => setShowResetConfirm(false)}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      </div>
  );
};