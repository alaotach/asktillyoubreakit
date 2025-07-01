"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/Navbar";

const topics = [
  { id: "general", name: "General Knowledge" },
  { id: "science", name: "Science" },
  { id: "history", name: "History" },
  { id: "literature", name: "Literature" },
  { id: "technology", name: "Technology" },
  { id: "art", name: "Art" },
  { id: "music", name: "Music" },
  { id: "film", name: "Film" },
  { id: "gaming", name: "Gaming" },
  { id: "anime", name: "Anime" },
  { id: "comics", name: "Comics" },
  { id: "manga", name: "Manga" },
  { id: "philosophy", name: "Philosophy" },
  { id: "all topics", name: "All Topics" },
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [other, setOther] = useState<string>("");

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOther(event.target.value);
  };

  return (
    <>
    <NavBar>
      <Link href="/about">About</Link>
    </NavBar>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ask Till You Break
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              "The only way to do great work is to love what you do" - Steve Jobs
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-12 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center text-gray-200">
                Choose a Topic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedTopic === topic.id
                        ? "border-purple-500 bg-purple-900/30"
                        : "border-gray-600 bg-gray-800 hover:border-gray-400"
                    }`}>
                    <div className="font-semibold">{topic.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center mb-8">
              <input
                type="text"
                placeholder="Or enter your own topic..."
                value={other}
                onChange={handleOtherChange}
                className="w-full max-w-md p-3 rounded-lg bg-gray-700 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
            {(selectedTopic || other.trim()) && (
              <div className="text-center">
                <Link href={`/questions/${other.trim() || selectedTopic}`}>
                  <button className="px-8 py-4 bg-purple-600 rounded-full font-bold text-xl hover:bg-purple-700 transition-colors">
                    Start Questions
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
    </div>
    </>
  );
}