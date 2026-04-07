'use client';

const projects = [
  {
    title: 'dzuizz.com',
    description: 'Personal portfolio website with a Kuromi-inspired design.',
    tags: ['Next.js', 'React', 'Tailwind'],
    url: 'https://dzuizz.com',
    live: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-5">
      <div className="max-w-3xl mx-auto">
        <SectionHeader title="Projects" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
          {projects.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 rounded-xl transition-all duration-300 kuromi-border"
              style={{ background: 'var(--card)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--pink)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px color-mix(in srgb, var(--pink) 10%, transparent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  className="font-[family-name:var(--font-display)] text-sm font-semibold"
                  style={{ color: 'var(--text)' }}
                >
                  {p.title}
                </h3>
                <svg
                  className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: 'var(--faded)' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-[family-name:var(--font-body)] rounded-full"
                    style={{
                      background: 'color-mix(in srgb, var(--pink) 8%, transparent)',
                      color: 'var(--pink)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}

          {/* Coming soon placeholder */}
          <div
            className="p-4 rounded-xl flex flex-col items-center justify-center min-h-[120px] kuromi-border"
            style={{ background: 'var(--surface)' }}
          >
            <p className="text-xs" style={{ color: 'var(--faded)' }}>
              More coming soon...
            </p>
          </div>
        </div>
      </div>
    </section>
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
