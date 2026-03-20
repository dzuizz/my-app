import Link from 'next/link';
import Image from 'next/image';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} - DZUIZZ.COM`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen gradient-hero">
      <Navigation />
      <article className="max-w-2xl mx-auto px-5 pt-24 pb-16">
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-xs font-[family-name:var(--font-body)] mb-4 inline-block"
            style={{ color: 'var(--muted)' }}
          >
            &larr; All posts
          </Link>
          <div className="flex items-start gap-4">
            <Image
              src="/kuromi-sitting.png"
              alt="Kuromi"
              width={40}
              height={40}
              className="object-contain mt-1 shrink-0"
            />
            <div>
              <h1
                className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                {post.title}
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--faded)' }}>
                {post.date}
              </p>
            </div>
          </div>
        </div>

        <div
          className="font-[family-name:var(--font-body)] text-sm leading-[1.8] space-y-4"
          style={{ color: 'var(--muted)' }}
        >
          {post.content
            .trim()
            .split('\n')
            .map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith('## ')) {
                return (
                  <h2
                    key={i}
                    className="font-[family-name:var(--font-display)] text-lg font-semibold pt-4"
                    style={{ color: 'var(--text)' }}
                  >
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith('- **')) {
                const match = trimmed.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
                if (match) {
                  return (
                    <p key={i} className="pl-4">
                      <span style={{ color: 'var(--text)' }}>&bull; <strong>{match[1]}</strong></span>
                      {match[2] && <>: {match[2]}</>}
                    </p>
                  );
                }
              }
              if (trimmed.startsWith('- ')) {
                return (
                  <p key={i} className="pl-4">
                    <span style={{ color: 'var(--text)' }}>&bull;</span> {trimmed.slice(2)}
                  </p>
                );
              }
              const parts = trimmed.split(/\*\*(.+?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} style={{ color: 'var(--text)' }}>
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
        </div>
      </article>
    </div>
  );
}
