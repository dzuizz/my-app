import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import Link from 'next/link';

interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
}

interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
}

async function getAllPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(process.cwd(), 'blog-content');
  const files = await fs.readdir(blogDir);

  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(blogDir, file), 'utf-8');
        const { data } = matter(content);
        return {
          slug: file.replace('.md', ''),
          frontmatter: data as BlogPostFrontmatter
        };
      })
  );

  // sort posts by date (newest first)
  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

async function getAdjacentPosts(currentSlug: string) {
  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
    next: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  };
}

async function getBlogPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'blog-content', `${slug}.md`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (!data.title || !data.description || !data.date) {
      throw new Error(`Missing required frontmatter fields in ${slug}.md`);
    }

    return {
      frontmatter: data as BlogPostFrontmatter,
      content
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      notFound();
    }
    throw error;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { frontmatter, content } = await getBlogPost(params.slug);
  const { prev, next } = await getAdjacentPosts(params.slug);

  return (
    <article className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <div className="mb-12 font-mono">
          <h1 className="mb-6 text-4xl font-bold">
            {frontmatter.title}
          </h1>
          <time className="text-sm text-gray-500" dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        {/* Main content */}
        <div className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation section */}
        <nav className="mt-16 border-t border-gray-200 pt-8 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {prev && (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col transition-colors duration-200 hover:text-blue-600"
                >
                  <span className="text-sm text-gray-500">← Previous</span>
                  <span className="group-hover:underline">{prev.frontmatter.title}</span>
                </Link>
              )}
            </div>

            <div className="mx-4">
              <Link
                href="/blog"
                className="rounded border border-gray-200 px-4 py-2 transition-colors duration-200 hover:bg-gray-50"
              >
                All Posts
              </Link>
            </div>

            <div className="flex-1 text-right">
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col transition-colors duration-200 hover:text-blue-600"
                >
                  <span className="text-sm text-gray-500">Next →</span>
                  <span className="group-hover:underline">{next.frontmatter.title}</span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'blog-content');
  const files = await fs.readdir(blogDir);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: file.replace('.md', '')
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { frontmatter } = await getBlogPost(params.slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}
