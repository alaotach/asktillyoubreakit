import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <NavBar>
        <Link href="/">Home</Link>
      </NavBar>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">About The Game</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card 
              title="What is this game?" 
              description="Ask Till You Break is an AI-powered quiz application that generates unlimited questions on any topic. Whether you want to test your knowledge or learn something new, we've got you covered!" 
            />
            
            <Card 
              title="How it works" 
              description="Select from predefined topics or enter your own custom topic. Our AI generates challenging questions tailored to your choice, adapting difficulty based on your previous answers." 
            />
            
            <Card 
              title="Features" 
              description="Experience unlimited AI-generated questions on infinite topics." 
            />
            
            <Card 
              title="Naruto Run" 
              description="While waiting for questions to load, enjoy the naruto run game inspired by T-Rex Dino Game!" 
            />
          </div>

          <div className="text-center">
            <Link href="/">
              <button className="px-8 py-4 bg-purple-600 rounded-full font-bold text-xl hover:bg-purple-700 transition-colors">
                Start Playing
              </button>
            </Link>
          </div>

          <footer className="mt-12 text-center text-gray-400 text-sm">
            <p>Made with ❤️ by <Link href="https://github.com/AlAoTach">AlAoTach</Link></p>
            <p className="mt-2 italic">"I'll keep going forward, no matter what, until I reach my dream. I will never give up" - Great Great AlAoTach (Naruto)</p>
          </footer>
        </div>
      </div>
    </>
  );
}