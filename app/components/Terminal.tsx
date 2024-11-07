'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/app/components/LoadingScreen';
import achievementsData from '@/public/data/achievements.json';
import contests from '@/public/data/contests.json';

const achievements = achievementsData;

export default function Terminal() {
  const [visibleSections, setVisibleSections] = useState<string[]>([
    'header',
    'about',
    'achievements',
    'socials',
  ]);
  const [showCursor, setShowCursor] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // ? Why does the staggered main page loading effect not reliably load all sections?
  // TODO: Fix unreliable staggered loading effect
  // useEffect(() => {
  //   if (!isLoading) {
  //     const sections = ['header', 'about', 'socials', 'achievements'];
  //     let currentIndex = 0;

  //     const interval = setInterval(() => {
  //       if (currentIndex < sections.length) {
  //         setVisibleSections((prev) => [...prev, sections[currentIndex]]);
  //         currentIndex++;
  //       } else {
  //         clearInterval(interval);
  //       }
  //     }, 500);

  //     return () => clearInterval(interval);
  //   }
  // }, [isLoading]);

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative font-mono"
          >
            {/* Terminal Header */}
            <div className="overflow-hidden rounded-lg border border-green-500/20 bg-green-950/30">
              <div className="flex items-center gap-1.5 border-b border-green-500/20 px-4 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <div className="ml-2 text-sm text-green-400">
                  dzuizz@portfolio ~{' '}
                </div>
              </div>

              <div className="space-y-4 p-4">
                {visibleSections.includes('header') && (
                  <Section>
                    <pre className="scrollbar-hide overflow-x-auto whitespace-pre font-mono text-xs leading-tight text-[#00ff00] md:text-sm">
                      {`██████╗ ███████╗██╗   ██╗██╗███████╗███████╗
██╔══██╗╚══███╔╝██║   ██║██║╚══███╔╝╚══███╔╝
██║  ██║  ███╔╝ ██║   ██║██║  ███╔╝   ███╔╝ 
██║  ██║ ███╔╝  ██║   ██║██║ ███╔╝   ███╔╝  
██████╔╝███████╗╚██████╔╝██║███████╗███████╗
╚═════╝ ╚══════╝ ╚═════╝ ╚═╝╚══════╝╚══════╝`}
                    </pre>
                  </Section>
                )}

                {visibleSections.includes('about') && (
                  <Section>
                    <Command>cat about.txt</Command>
                    <Output>
                      <div className="glitch-text">Ahmad Dzuizz Annajib</div>
                      <a
                        href="https://www.nushigh.edu.sg/"
                        className="mt-1 text-green-600"
                      >
                        NUS High School of Math & Science
                      </a>
                      {' ← '}
                      <a
                        href="https://www.afkaaruna.sch.id/"
                        className="text-green-600"
                      >
                        MTs Afkaaruna Islamic School
                      </a>
                      {' ← '}
                      <a href="https://irsyad.sg/" className="text-green-600">
                        Madrasah Irsyad Zuhri Al-Islamiah
                      </a>
                      <div className="mt-2 italic text-green-400">
                        &quot;I think my life through code, and code through my
                        life.&quot;
                      </div>
                    </Output>
                  </Section>
                )}

                {visibleSections.includes('achievements') && (
                  <Section>
                    <Command>cat achievements.json | highlight</Command>
                    <Output>
                      <div className="space-y-4">
                        {achievements.map((year, i) => (
                          <div
                            key={i}
                            className="rounded border border-green-500/20 bg-black/20 p-2"
                          >
                            <div className="font-bold text-green-400">
                              {year.year} // {year.grade}
                            </div>
                            <div className="mt-2 space-y-1">
                              {year.items.map((item, j) => (
                                <div
                                  key={j}
                                  className="items-baseline gap-2 text-sm"
                                >
                                  <span className="text-yellow-500">→ </span>
                                  <span className="text-green-400">
                                    {item.title}{' '}
                                    {contests[
                                      item.title as keyof typeof contests
                                    ]
                                      ? '(' +
                                        contests[
                                          item.title as keyof typeof contests
                                        ] +
                                        ') '
                                      : ''}
                                  </span>
                                  <span
                                    className={`text-xs ${getAwardColor(item.award)}`}
                                  >
                                    {item.award}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Output>
                  </Section>
                )}

                {visibleSections.includes('socials') && (
                  <Section>
                    <Command>ls -la socials/</Command>
                    <Output>
                      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                        {[
                          {
                            name: 'Instagram',
                            link: '@ahmad.dzuizz.annajib',
                            href: 'https://www.instagram.com/ahmad.dzuizz.annajib/',
                          },
                          {
                            name: 'Twitter',
                            link: '@AhmadDzuizz',
                            href: 'https://x.com/AhmadDzuizz/',
                          },
                          {
                            name: 'LinkedIn',
                            link: 'dzuizz',
                            href: 'https://www.linkedin.com/in/dzuizz/',
                          },
                          {
                            name: 'GitHub',
                            link: 'dzuizz',
                            href: 'https://github.com/dzuizz',
                          },
                          {
                            name: 'Codeforces',
                            link: 'dzuizz',
                            href: 'https://codeforces.com/profile/dzuizz',
                          },
                          {
                            name: 'Kattis',
                            link: 'dzuizz',
                            href: 'https://open.kattis.com/users/dzuizz',
                          },
                        ].map((social, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm"
                          >
                            <a href={social.href} className="text-green-600">
                              λ
                            </a>
                            <a href={social.href} className="text-green-400">
                              {social.name}
                            </a>
                            <a href={social.href} className="text-green-600">
                              {social.link}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Output>
                  </Section>
                )}

                <div className="flex items-center gap-1">
                  <span className="text-green-400">❯</span>
                  <span
                    className={`h-4 w-2 bg-green-400 ${showCursor ? 'animate-pulse' : ''}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      {children}
    </motion.div>
  );
}

function Command({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-green-400">❯</span>
      <span className="text-green-300">{children}</span>
    </div>
  );
}

function Output({ children }: { children: React.ReactNode }) {
  return <div className="ml-4 mt-2">{children}</div>;
}

function getAwardColor(award: string) {
  const lower = award.toLowerCase();
  if (lower.includes('platinum') || lower.includes('high distinction'))
    return 'text-purple-400';
  if (
    lower.includes('gold') ||
    lower.includes('distinction') ||
    lower.includes('place')
  )
    return 'text-yellow-500';
  if (
    lower.includes('silver') ||
    lower.includes('merit') ||
    lower.includes('perak')
  )
    return 'text-slate-400';
  if (
    lower.includes('bronze') ||
    lower.includes('honourable') ||
    lower.includes('third')
  )
    return 'text-orange-500';
  return 'text-green-400';
}
