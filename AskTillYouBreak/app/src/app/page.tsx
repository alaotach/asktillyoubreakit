"use client";

import { useState } from "react";
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
  { id: "philosophy", name: "Philosophy" }
]

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  return (
    <div>
      <div>
        <h1>Ask Till You Break.</h1>
        <div>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}>
              <div>{topic.name}</div>
            </button>
          ))}
        </div>
        {selectedTopic && (
          <Link href={`/questions/${selectedTopic}`}>
            <button>
              Start Questions
            </button>
          </Link>
        )}
      </div>
    </div>
    
  );
}
