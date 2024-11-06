import Terminal from './components/Terminal';

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-2xl px-4 py-8">
      <div className="relative space-y-8">
        <Terminal />
      </div>
    </main>
  );
}
