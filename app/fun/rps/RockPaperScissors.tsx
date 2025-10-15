'use client';
import RoundedBox from '@/app/components/RoundedBox';
import { useState, useEffect, useMemo } from 'react';

type Choice = 'rock' | 'paper' | 'scissors' | null;
type Result = "It's a tie!" | 'You win!' | 'Computer wins!' | '';

interface Score {
  player: number;
  computer: number;
}

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<Result>('');
  const [score, setScore] = useState<Score>({ player: 0, computer: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const choices: Choice[] = useMemo(() => ['rock', 'paper', 'scissors'], []);

  const icons = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
  };

  const handlePlayerChoice = (choice: Choice) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setPlayerChoice(choice);
    setComputerChoice(null);
    setResult('');
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerChoice);

      if (playerChoice && computerChoice) {
        const gameResult = determineWinner(playerChoice, computerChoice);
        setResult(gameResult);

        if (gameResult === 'You win!') {
          setScore(prev => ({ ...prev, player: prev.player + 1 }));
        } else if (gameResult === 'Computer wins!') {
          setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
        }
      }

      setIsAnimating(false);
    }
  }, [countdown, playerChoice, choices]);

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) return "It's a tie!";

    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'You win!';
    }

    return 'Computer wins!';
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Rock Paper Scissors</h1>

      <RoundedBox className="flex justify-around w-full mb-8">
        <div className="text-center px-4">
          <div className="text-lg font-bold mb-1">You</div>
          <div className="text-3xl font-bold text-blue-600">{score.player}</div>
        </div>

        <div className="text-center px-4">
          <div className="text-lg font-bold mb-1">Computer</div>
          <div className="text-3xl font-bold text-red-600">{score.computer}</div>
        </div>
      </RoundedBox>

      <RoundedBox className="flex justify-between items-center w-full mb-8">
        <div className="text-center w-1/3">
          <div className="text-6xl mb-2 h-20 flex items-center justify-center">
            {playerChoice ? icons[playerChoice] : '?'}
          </div>
          <div className="text-sm text-gray-600">Your choice</div>
        </div>

        <div className="text-center text-2xl font-bold w-1/3">
          {countdown ? countdown : result || 'vs'}
        </div>

        <div className="text-center w-1/3">
          <div className="text-6xl mb-2 h-20 flex items-center justify-center">
            {computerChoice ? icons[computerChoice as keyof typeof icons] : '?'}
          </div>
          <div className="text-sm text-gray-600">Computer&#39;s choice</div>
        </div>
      </RoundedBox>

      {
        !isAnimating && (
          <RoundedBox className="grid grid-cols-3 gap-4 w-full mb-8">
            {choices.map(choice => (
              <button
                key={choice}
                onClick={() => handlePlayerChoice(choice)}
                className={`py-3 rounded-lg text-center capitalize font-medium transition-colors
                ${playerChoice === choice ? 'border-2 border-red-500' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <span className="block text-2xl mb-1">{icons[choice as keyof typeof icons]}</span>
                {choice}
              </button>
            ))}
          </RoundedBox>
        )
      }

      {
        (result || isAnimating) && (
          <button
            onClick={resetGame}
            disabled={isAnimating}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            {isAnimating ? 'Game in progress...' : 'Restart Game'}
          </button>
        )
      }
    </div>
  );
};

export default RockPaperScissors;
