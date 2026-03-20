import fs from 'fs';
import path from 'path';

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  pinned: boolean;
};

const PHOTOS_MANIFEST = path.join(process.cwd(), 'content', 'photos', 'photos.json');

function loadPhotos(): Photo[] {
  const raw = fs.readFileSync(PHOTOS_MANIFEST, 'utf-8');
  const data = JSON.parse(raw) as Array<{ src: string; alt: string; caption: string; pinned?: boolean }>;
  return data.map((p) => ({
    src: p.src,
    alt: p.alt,
    caption: p.caption,
    pinned: p.pinned ?? false,
  }));
}

let _cache: Photo[] | null = null;
function getAll(): Photo[] {
  if (!_cache) _cache = loadPhotos();
  return _cache;
}

export function getAllPhotos(): Photo[] {
  return getAll();
}

export function getPinnedPhotos(): Photo[] {
  return getAll().filter((p) => p.pinned);
}
