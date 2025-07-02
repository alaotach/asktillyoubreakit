import Link from "next/link";
import { ReactNode } from "react";

export default function NavBar({ children }: { children?: ReactNode }) {
  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white justify-center align-middle">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      {children}
    </nav>
  );
}