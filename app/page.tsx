import Achievements from './components/Achievements';
import Hero from './components/Hero';
import Socials from './components/Socials';

export default function Home() {
  return (
    <main className="p-4">
      {/* Hero */}
      <Hero />

      {/* Achievements */}
      <Achievements />

      {/* Socials */}
      <Socials />

      {/*<div className="">
        <Terminal />
      </div>
      */}
    </main>
  );
}
