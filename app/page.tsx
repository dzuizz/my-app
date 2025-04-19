import RoundedBox from './components/RoundedBox';
import CursorGradient from './components/CursorGradient';

import Hero from './components/Hero';
import Achievements from './components/Achievements';
import Socials from './components/Socials';

export default function Home() {
  return (
    <>
      {/* Cursor gradient effect */}
      <CursorGradient
        size={350}
        opacity={0.3}
        color="var(--accent-color)"
        blur={80}
      />

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
    </>
  );
}
