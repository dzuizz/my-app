import Link from 'next/link';
import Image from 'next/image';
import { getAllPhotos } from '@/lib/photos';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Photos - DZUIZZ.COM',
  description: 'Photo gallery by Ahmad Dzuizz Annajib',
};

export default function PhotosPage() {
  const photos = getAllPhotos();

  return (
    <div className="min-h-screen gradient-projects">
      <Navigation />
      <div className="max-w-3xl mx-auto px-5 pt-24 pb-16">
        <div className="flex items-center gap-4 mb-10">
          <Image
            src="/kuromi-small.png"
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
              Photos
            </h1>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Moments from competitions, school, and life.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-square rounded-xl overflow-hidden kuromi-border"
              style={{ background: 'var(--card)' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-2.5 text-xs font-[family-name:var(--font-body)]"
                style={{
                  background: 'linear-gradient(transparent, color-mix(in srgb, var(--bg) 85%, transparent))',
                  color: 'var(--muted)',
                }}
              >
                {photo.caption}
              </div>
            </div>
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
