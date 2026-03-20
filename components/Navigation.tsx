'use client';

import { useState, useEffect } from 'react';
import KuromiIcon from './KuromiIcon';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Achievements', href: '/#achievements' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Photos', href: '/photos' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'color-mix(in srgb, var(--bg) 90%, transparent)'
          : 'var(--bg)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-3xl mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          <a href="/" className="flex items-center gap-2">
            <KuromiIcon size={28} />
            <span
              className="font-[family-name:var(--font-display)] font-bold text-sm"
              style={{ color: 'var(--text)' }}
            >
              dzuizz
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs font-[family-name:var(--font-body)] rounded-lg transition-colors duration-200"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile */}
          <div className="flex sm:hidden items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex items-center justify-center"
              style={{ color: 'var(--muted)' }}
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="sm:hidden pb-4 flex flex-col gap-1 pt-2"
            style={{
              borderTop: '1px solid var(--border)',
              background: 'var(--bg)',
            }}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-[family-name:var(--font-body)] rounded-lg"
                style={{ color: 'var(--muted)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
