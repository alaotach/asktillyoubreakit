"use client";

import { useState } from "react";
import NavBar from "@/components/Navbar";
import Link from "next/link";

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

  const finalTopic = other.trim() || selectedTopic;

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
              &ldquo;The only way to do great work is to love what you do&rdquo; - Steve Jobs
            </p>
          </div>
          <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 lg:p-12 shadow-xl">
            <div className="mb-8">
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center text-gray-200">
                Choose a Topic
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedTopic === topic.id
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    {topic.name}
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
            {finalTopic && (
              <div className="text-center">
                <Link href={`/questions/${encodeURIComponent(finalTopic)}`}>
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg">
                    Start Quiz: {finalTopic}
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