"use client"
import { useRouter } from "next/navigation";

interface BackProps {
  className?: string;
}

export default function Back({ className = "" }: BackProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors group ${className}`}
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}