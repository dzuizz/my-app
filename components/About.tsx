'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, School, Terminal } from 'lucide-react';

export default function About() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Dzuizz";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:py-20 px-6 sm:px-8 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-10 text-zinc-800/20 font-mono text-9xl font-bold select-none pointer-events-none rotate-12 blur-sm">
        0x1
      </div>

      <div className="max-w-3xl mx-auto w-full space-y-10 sm:space-y-14 z-10">
        
        {/* Header Section */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-950/30 border border-emerald-900/50 rounded text-xs font-mono text-emerald-500 mb-2">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight">
            Hi, I&apos;m <span className="font-semibold text-emerald-400 inline-block min-w-[3ch]">{typedText}<span className="animate-pulse text-emerald-500">_</span></span>
          </h1>
          <h2 className="text-xl sm:text-2xl text-zinc-400 font-mono tracking-tight flex items-center gap-3">
            <span className="text-emerald-500/50">{'>'}</span> Competitive Programmer
          </h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-zinc-500 pt-2 font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-md border border-zinc-800/50">
              <MapPin className="w-3.5 h-3.5" />
              <span>Singapore</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-md border border-zinc-800/50">
              <School className="w-3.5 h-3.5" />
              <span>NUS High School</span>
            </div>
          </div>
        </div>

        {/* Divider with Glitch Accent */}
        <div className="relative h-px w-full bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/20 w-1/3 animate-[shimmer_2s_infinite_linear] -translate-x-full" />
        </div>

        {/* Bio */}
        <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg sm:text-xl max-w-2xl">
          <p>
            I am a student passionate about <strong className="text-zinc-200 font-normal border-b border-emerald-500/30 pb-0.5">algorithms</strong> and <strong className="text-zinc-200 font-normal border-b border-emerald-500/30 pb-0.5">computational thinking</strong>. My journey involves solving complex problems and exploring the depths of computer science through competitive programming.
          </p>
          <p>
            I actively participate in national and international Olympiads, including the <span className="text-zinc-200 font-medium">National Olympiad in Informatics (NOI)</span> and the <span className="text-zinc-200 font-medium">Singapore Math Olympiad (SMO)</span>, consistently striving for excellence.
          </p>
        </div>

        {/* Tech Stack - Retro Terminal Style */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 font-bold font-mono">
            <Terminal className="w-4 h-4" />
            <span>Stack_Trace</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['C++', 'Python', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Git'].map((tech) => (
              <div key={tech} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded opacity-20 group-hover:opacity-75 transition duration-200 blur-sm"></div>
                <div className="relative px-3 py-2 bg-zinc-950 border border-zinc-800 rounded text-sm font-mono text-zinc-300 group-hover:text-emerald-400 group-hover:border-emerald-500/50 transition-colors cursor-default">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
