'use client';

import RoundedBox from '../components/RoundedBox';
import CursorGradient from '../components/CursorGradient';
import Navbar from '../components/Navbar';

export default function HallOfFame() {
  return (
    <>
      <CursorGradient
        size={350}
        opacity={0.3}
        color="var(--accent-color)"
        blur={80}
      />

      <Navbar />

      <main className="flex flex-col gap-4 p-4 pt-2">
        <RoundedBox>
          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--accent-color)' }}>
              Hall of Fame
            </h1>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Aidan Sin Yew Wai</h2>
              <p className="text-lg mb-6">Muscle-Up Achievement</p>

              <div className="flex justify-center mb-6">
                <div className="w-full max-w-2xl">
                  <video
                    controls
                    className="w-full rounded-lg border-2"
                    style={{ borderColor: 'var(--accent-color)' }}
                  >
                    <source src="/vids/aidan-muscle-up.mp4" type="video/mp4" />
                    <source src="/vids/aidan-muscle-up.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="text-center">
                <p className="text-base opacity-80">
                  elegant.
                </p>
              </div>
            </div>
          </div>
        </RoundedBox>
      </main>
    </>
  );
}
