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
  { id: "philosophy", name: "Philosophy" }
]

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-purple-400">Ask Till You Break.</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
        {selectedTopic && (
          <Link href={`/questions/${selectedTopic}`}>
            <button className="px-8 py-4 bg-purple-600 rounded-full font-bold text-xl hover:bg-purple-700 transition-colors">
              Start Questions
            </button>
          </Link>
        )}
      </div>
    </div>
    </>
  );
}
