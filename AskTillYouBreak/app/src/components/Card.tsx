export default function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
}