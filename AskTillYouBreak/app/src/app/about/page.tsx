import NavBar from "@/components/Navbar";
import Card from "@/components/Card";

export default function AboutPage() {
  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <Card title="About This App" description="This is a quiz app built with Next.js." />
    </>
  );
}