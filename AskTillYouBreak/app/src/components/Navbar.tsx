"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";

export default function NavBar({ children }: { children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
      <Link href="/" className="text-xl font-bold text-purple-400 hover:text-purple-300">
        Ask Till You Break
      </Link>
      <div className="hidden md:flex gap-4 items-center">
        {children}
        <Link href="/stats" className="hover:text-purple-300">
          Stats
        </Link>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-gray-700 rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-800 md:hidden">
          <div className="flex flex-col p-4 gap-2">
            {children}
            <Link href="/stats" className="hover:text-purple-300" onClick={() => setIsOpen(false)}>
              Stats
            </Link>
          </div>
        </div>
      )}
      </div>
      </div>
    </nav>
  );
}