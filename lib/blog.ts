import fs from 'fs';
import path from 'path';

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  pinned: boolean;
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    meta[key] = val;
  }
  return { meta, content: match[2] };
}

function loadPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug: file.replace(/\.md$/, ''),
      title: meta.title || file.replace(/\.md$/, ''),
      date: meta.date || '',
      excerpt: meta.excerpt || '',
      content,
      pinned: meta.pinned === 'true',
    };
  });
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

// Cache at module level (only runs at build time / server side)
let _cache: BlogPost[] | null = null;
function getAll(): BlogPost[] {
  if (!_cache) _cache = loadPosts();
  return _cache;
}

export function getAllPosts(): BlogPost[] {
  return getAll();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAll().find((p) => p.slug === slug);
}

export function getPinnedPosts(): BlogPost[] {
  return getAll().filter((p) => p.pinned);
}

export function getAllSlugs(): string[] {
  return getAll().map((p) => p.slug);
}
