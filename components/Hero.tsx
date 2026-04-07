'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-5 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Kuromi image */}
          <div className="animate-float shrink-0">
            <Image
              src="/kuromi-hero.png"
              alt="Kuromi"
              width={120}
              height={120}
              className="w-24 h-24 sm:w-[120px] sm:h-[120px] object-contain drop-shadow-[0_0_24px_rgba(255,77,141,0.2)]"
              priority
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h1
                className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                Ahmad Dzuizz Annajib
              </h1>
              <p
                className="font-[family-name:var(--font-body)] text-sm sm:text-base leading-relaxed max-w-lg"
                style={{ color: 'var(--muted)' }}
              >
                Student at{' '}
                <span style={{ color: 'var(--text)' }}>NUS High School of Mathematics and Science</span>.<br />
                Trying to make stuff with 0s and 1s... I guess
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag icon="location">Singapore</Tag>
              <Tag icon="school">NUS High</Tag>
              <Tag icon="code">Competitive Programmer</Tag>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              <Stat value="NOI Gold" />
              <Stat value="Hackathon Winner" />
              <Stat value="VBL Master" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tag({ children, icon }: { children: React.ReactNode; icon: 'location' | 'school' | 'code' }) {
  const icons = {
    location: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
      </svg>
    ),
    school: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    code: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  };

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-[family-name:var(--font-body)]"
      style={{
        background: 'var(--card)',
        color: 'var(--muted)',
        border: '1px solid var(--border)',
      }}
    >
      {icons[icon]}
      {children}
    </span>
  );
}

function Stat({ value }: { value: string }) {
  return (
    <span
      className="text-xs font-[family-name:var(--font-display)] font-semibold"
      style={{ color: 'var(--pink)' }}
    >
      {value}
    </span>
  );
}
