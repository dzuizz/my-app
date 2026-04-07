import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import type { Photo } from '@/lib/photos';

type Props = {
  pinnedPosts: BlogPost[];
  pinnedPhotos: Photo[];
};

export default function Extras({ pinnedPosts, pinnedPhotos }: Props) {
  return (
    <section id="extras" className="py-16 px-5">
      <div className="max-w-3xl mx-auto space-y-12">

        {/* ---- Blog section ---- */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/kuromi-wave.png"
                alt="Kuromi"
                width={36}
                height={36}
                className="object-contain"
              />
              <h2
                className="font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: 'var(--text)' }}
              >
                Blog
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-[family-name:var(--font-body)] transition-colors"
              style={{ color: 'var(--pink)' }}
            >
              View all &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {pinnedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-4 rounded-xl kuromi-border transition-all duration-200 hover:border-[var(--pink)]"
                style={{ background: 'var(--card)' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3
                      className="font-[family-name:var(--font-display)] text-sm font-semibold mb-1 group-hover:text-[var(--pink)] transition-colors"
                      style={{ color: 'var(--text)' }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--muted)' }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-[11px] font-[family-name:var(--font-body)] mt-0.5"
                    style={{ color: 'var(--faded)' }}
                  >
                    {post.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ---- Photos section ---- */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Image
                src="/kuromi-sitting.png"
                alt="Kuromi"
                width={36}
                height={36}
                className="object-contain"
              />
              <h2
                className="font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: 'var(--text)' }}
              >
                Photos
              </h2>
            </div>
            <Link
              href="/photos"
              className="text-xs font-[family-name:var(--font-body)] transition-colors"
              style={{ color: 'var(--pink)' }}
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {pinnedPhotos.map((photo, i) => (
              <Link
                key={i}
                href="/photos"
                className="group relative aspect-square rounded-xl overflow-hidden kuromi-border transition-all duration-200 hover:border-[var(--pink)]"
                style={{ background: 'var(--card)' }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-2 text-[11px] font-[family-name:var(--font-body)]"
                  style={{
                    background: 'linear-gradient(transparent, color-mix(in srgb, var(--bg) 85%, transparent))',
                    color: 'var(--muted)',
                  }}
                >
                  {photo.caption}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
