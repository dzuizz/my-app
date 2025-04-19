import Link from 'next/link';

interface Game {
  id: string;
  title: string;
  description: string;
  path: string;
}

export default function FunPage() {
  const games: Game[] = [
    {
      id: 'rps',
      title: 'Rock Paper Scissors',
      description: 'rock... paper... scissors... SHOOT!',
      path: '/fun/rps'
    },
    {
      id: 'memory',
      title: 'Memory Game',
      description: 'Coming soon...',
      path: '/fun'
    },
    {
      id: 'quiz',
      title: 'Coding Quiz',
      description: 'Coming soon...',
      path: '/fun'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Fun & Games</h1>
      <p className="text-gray-600 mb-8">
        try these games
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map(game => (
          <Link
            href={game.path}
            key={game.id}
            className="block group"
          >
            <div className="border rounded-lg overflow-hidden transition-all group-hover:shadow-md group-hover:border-blue-300">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{game.title}</h2>
                <p className="text-gray-600 text-sm">{game.description}</p>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:underline">
                  Play now →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
