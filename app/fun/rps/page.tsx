'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RockPaperScissors = dynamic(() => import('./RockPaperScissors'), {
  ssr: false,
  loading: () => <p className="text-center py-8">Loading game...</p>
});

export default function RPSPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/fun" className="text-blue-600 hover:underline flex items-center">
          ← Back to Fun
        </Link>
      </div>

      <RockPaperScissors />

      <div className="mt-12 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold mb-4">How to Play</h2>
        <p className="mb-4">
          Select rock, paper, or scissors and make your move. The computer will (randomly) make a move, and the winner will be determined as follows:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Rock crushes scissors (rock wins)</li>
          <li>Scissors cut paper (scissors win)</li>
          <li>Paper covers rock (paper wins)</li>
          <li>If both players choose the same option, it&#39;s a tie</li>
        </ul>

        <h2 className="text-xl font-bold mb-4">About This Game</h2>
        <p>
          bro its just rps; its not that deep.
        </p>
      </div>
    </div>
  );
}
