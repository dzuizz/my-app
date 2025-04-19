import Achievements from './components/Achievements';
import Hero from './components/Hero';
import Socials from './components/Socials';
import RoundedBox from './components/RoundedBox';

export default function Home() {
  return (
    <main className="flex flex-col gap-4 p-4">
      {/* Hero */}
      <RoundedBox>
        <Hero />
      </RoundedBox>

      {/* Achievements */}
      <RoundedBox>
        <Achievements />
      </RoundedBox>

      {/* Socials */}
      <RoundedBox>
        <Socials />
      </RoundedBox>

      {/*<div className="">
        <Terminal />
      </div>
      */}
    </main>
  );
}
