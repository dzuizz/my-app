import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/blog';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Blog - DZUIZZ.COM',
  description: 'Blog posts by Ahmad Dzuizz Annajib',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen gradient-extras">
      <Navigation />
      <div className="max-w-3xl mx-auto px-5 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-10">
          <Image
            src="/kuromi-wave.png"
            alt="Kuromi"
            width={56}
            height={56}
            className="object-contain"
          />
          <div>
            <h1
              className="font-[family-name:var(--font-display)] text-2xl font-bold"
              style={{ color: 'var(--text)' }}
            >
              Blog
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Thoughts on programming, math, and life.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-5 rounded-xl kuromi-border transition-all duration-200 hover:border-[var(--pink)]"
              style={{ background: 'var(--card)' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2
                    className="font-[family-name:var(--font-display)] text-base font-semibold mb-1 group-hover:text-[var(--pink)] transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {post.excerpt}
                  </p>
                </div>
                <span
                  className="shrink-0 text-xs font-[family-name:var(--font-body)] mt-1"
                  style={{ color: 'var(--faded)' }}
                >
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-xs font-[family-name:var(--font-body)]"
            style={{ color: 'var(--muted)' }}
          >
            &larr; Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
