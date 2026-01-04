'use client';

import React from 'react';
import { FolderCode, Construction } from 'lucide-react';

export default function Projects() {
  return (
    <div className="min-h-[60vh] bg-zinc-950 text-zinc-300 py-20 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl mb-2">
            <FolderCode className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-light text-white tracking-tight">Projects</h2>
          <div className="h-0.5 w-12 bg-zinc-800 rounded-full" />
        </div>

        {/* Coming Soon Card */}
        <div className="relative group overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8 sm:p-12 transition-all duration-500 hover:border-emerald-500/20 hover:bg-zinc-900/30">
          
          {/* Animated corner accents */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-zinc-800 group-hover:border-emerald-500/50 transition-colors" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-zinc-800 group-hover:border-emerald-500/50 transition-colors" />

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Construction className="w-16 h-16 text-zinc-800 animate-pulse" />
              <div className="absolute inset-0 text-emerald-500/10 blur-xl">
                 <Construction className="w-16 h-16" />
              </div>
            </div>

            <div className="space-y-2 text-center">
              <p className="text-xl font-mono text-zinc-400">Coming soon...</p>
              <p className="text-sm text-zinc-600 font-light max-w-xs">
                I&apos;m currently working on some exciting new projects. Check back soon for updates!
              </p>
            </div>

            {/* Faux progress bar */}
            <div className="w-full max-w-xs h-1 bg-zinc-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500/40 w-1/3 animate-[loading_3s_infinite_ease-in-out]" />
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(200%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}