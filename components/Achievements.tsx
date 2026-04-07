'use client';

import { useState, useEffect } from 'react';

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

const getAwardColor = (award: string) => {
  const l = award.toLowerCase();
  if (l.includes('gold') || l.includes('platinum') || l.includes('perfect') || l.includes('first'))
    return 'var(--pink)';
  if (l.includes('silver') || l.includes('perak'))
    return 'var(--purple)';
  if (l.includes('bronze'))
    return 'var(--pink-soft)';
  return 'var(--muted)';
};

export default function Achievements() {
  const [data, setData] = useState<AchievementYear[]>([]);

  useEffect(() => {
    fetch('/achievements.json')
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <section id="achievements" className="py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Achievements" />

        <div className="relative mt-8">
          {/* Timeline line */}
          <div
            className="absolute left-[7px] top-2 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--pink), var(--purple), transparent)' }}
          />

          <div className="space-y-8">
            {data.map((group, i) => (
              <div key={i} className="relative pl-7">
                {/* Node */}
                <div
                  className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full"
                  style={{
                    background: 'var(--bg)',
                    border: '2px solid var(--pink)',
                    boxShadow: '0 0 8px color-mix(in srgb, var(--pink) 30%, transparent)',
                  }}
                />

                {/* Year */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="font-[family-name:var(--font-display)] text-lg font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {group.year}
                  </span>
                  <span
                    className="text-[11px] font-[family-name:var(--font-body)]"
                    style={{ color: 'var(--faded)' }}
                  >
                    {group.grade}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-0.5">
                  {group.items.map((item, j) => (
                    <AchievementRow key={j} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementRow({ item }: { item: AchievementItem }) {
  const hasFile = item.filename?.trim();
  const Tag = hasFile ? 'a' : 'div';
  const linkProps = hasFile
    ? { href: `/certs/${item.filename}`, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      {...linkProps}
      className="group flex items-center justify-between gap-3 py-1.5 px-2 -mx-2 rounded-lg transition-colors duration-200"
      style={{ cursor: hasFile ? 'pointer' : 'default' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'var(--card)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="text-sm font-[family-name:var(--font-body)] truncate"
          style={{ color: 'var(--text)' }}
        >
          {item.title}
        </span>
        {hasFile && (
          <svg
            className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--pink)' }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        )}
        {item.ranking && (
          <span
            className="hidden sm:inline text-[11px] truncate"
            style={{ color: 'var(--faded)' }}
          >
            {item.ranking}
          </span>
        )}
      </div>
      <span
        className="shrink-0 text-[11px] font-[family-name:var(--font-display)] font-semibold uppercase tracking-wide"
        style={{ color: getAwardColor(item.award) }}
      >
        {item.award}
      </span>
    </Tag>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2
        className="font-[family-name:var(--font-display)] text-xl font-bold"
        style={{ color: 'var(--text)' }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
    </div>
  );
}
