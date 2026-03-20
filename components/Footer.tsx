'use client';

import Image from 'next/image';

const socials = [
  { label: 'GitHub', url: 'https://github.com/dzuizz' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/dzuizz' },
  { label: 'Codeforces', url: 'https://codeforces.com/profile/dzuizz' },
  { label: 'Email', url: 'mailto:ahmad@dzuizz.com' },
];

export default function Footer() {
  return (
    <footer className="py-12 px-5" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/kuromi-small.png"
              alt="Kuromi"
              width={36}
              height={36}
              className="object-contain"
            />
            <div>
              <p
                className="font-[family-name:var(--font-display)] text-sm font-bold"
                style={{ color: 'var(--text)' }}
              >
                dzuizz.com
              </p>
              <p className="text-[11px]" style={{ color: 'var(--faded)' }}>
                Mischief Managed
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-[family-name:var(--font-body)] transition-colors duration-200"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <p className="text-[11px] mt-8" style={{ color: 'var(--faded)' }}>
          &copy; {new Date().getFullYear()} Ahmad Dzuizz Annajib
        </p>
      </div>
    </footer>
  );
}
