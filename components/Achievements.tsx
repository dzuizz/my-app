'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';

// --- Types ---
type AchievementItem = {
  title: string;
  award: string;
  ranking: string;
  filename: string;
};

type AchievementYear = {
  year: string;
  grade: string;
  items: AchievementItem[];
};

// --- Minimalist Color Helper ---
const getAwardColor = (award: string) => {
  const lower = award.toLowerCase();
  if (lower.includes('gold') || lower.includes('platinum') || lower.includes('1st')) return 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.2)]';
  if (lower.includes('silver')) return 'text-zinc-300 drop-shadow-[0_0_8px_rgba(212,212,216,0.1)]';
  if (lower.includes('bronze')) return 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.1)]';
  return 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.1)]';
};

export default function Achievements() {
  const [data, setData] = useState<AchievementYear[]>([]);

  useEffect(() => {
    fetch('/achievements.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 py-16 px-4 sm:px-6 relative">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Centered Container */}
      <div className="max-w-3xl mx-auto space-y-16 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 relative">
           <div className="inline-block relative">
            <h2 className="text-3xl font-light text-white tracking-tight flex items-center justify-center gap-3">
              <Trophy className="w-6 h-6 text-zinc-700" />
              Achievements
            </h2>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-950 border border-zinc-700 rotate-45" />
           </div>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-900 ml-3 sm:ml-0 space-y-12">

          {data.map((group, gIdx) => (
            <div key={gIdx} className="relative pl-6 sm:pl-10 group/year">

              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-none bg-zinc-950 border border-zinc-700 group-hover/year:border-emerald-500 group-hover/year:bg-emerald-950 transition-colors duration-300 rotate-45" />

              {/* Year Header */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-xl font-mono font-semibold text-white tracking-tight">{group.year}</span>
                <span className="text-xs text-zinc-600 uppercase tracking-widest font-mono border border-zinc-900 px-2 py-0.5 rounded bg-zinc-900/50">{group.grade}</span>
              </div>

              {/* Compact List Items */}
              <div className="flex flex-col gap-2">
                {group.items.map((item, iIdx) => (
                  <CompactItem key={iIdx} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Compact Row Component ---
function CompactItem({ item }: { item: AchievementItem }) {
  const hasFile = item.filename && item.filename.trim() !== "";

  // Wrapper determination
  const Wrapper = hasFile ? 'a' : 'div';
  const wrapperProps = hasFile
    ? { href: `/certs/${item.filename}`, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`
        relative group flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-1 py-3 px-4 rounded border border-transparent
        transition-all duration-300
        ${hasFile ? 'hover:bg-zinc-900/40 hover:border-zinc-800/80 cursor-pointer' : 'hover:bg-zinc-900/20'}
      `}
    >
      {/* Decorative corner accent for hover */}
      {hasFile && <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/0 group-hover:border-emerald-500/50 transition-all duration-300" />}
      {hasFile && <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/0 group-hover:border-emerald-500/50 transition-all duration-300" />}

      {/* Left: Title & Ranking */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-zinc-300 group-hover:text-emerald-200 truncate transition-colors font-mono">
            {item.title}
          </h3>
          {hasFile && (
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-500 transition-all group-hover:-translate-y-0.5" />
          )}
        </div>

        {/* Only show ranking if it exists */}
        {item.ranking && (
          <p className="text-[11px] text-zinc-500 truncate mt-1 font-mono pl-0.5">
            {item.ranking}
          </p>
        )}
      </div>

      {/* Right: Award Badge (Right Aligned) */}
      <div className={`shrink-0 text-xs font-bold tracking-wide uppercase font-mono ${getAwardColor(item.award)}`}>
        {item.award}
      </div>
    </Wrapper>
  );
}