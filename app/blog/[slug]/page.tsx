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

// Function to get all blog posts sorted by date
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

  // Sort posts by date (newest first)
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

// Function to get adjacent posts
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
    <article className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header section */}
        <div className="mb-12 font-mono">
          <h1 className="glitch-text mb-6" data-text={frontmatter.title}>
            {frontmatter.title}
          </h1>
          <time className="text-green-400/80 text-sm" dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
        
        {/* Main content */}
        <div className="prose-terminal">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              // ... (previous components remain the same)
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Navigation section */}
        <nav className="mt-16 border-t border-green-500/30 pt-8 font-mono">
          <div className="flex justify-between items-center text-green-400">
            <div className="flex-1">
              {prev && (
                <Link 
                  href={`/blog/${prev.slug}`}
                  className="group flex flex-col hover:text-green-300 transition-colors duration-200"
                >
                  <span className="text-sm text-green-500">← Previous</span>
                  <span className="group-hover:underline">{prev.frontmatter.title}</span>
                </Link>
              )}
            </div>

            <div className="mx-4">
              <Link
                href="/blog"
                className="px-4 py-2 border border-green-500/30 rounded hover:bg-green-500/10 
                         transition-colors duration-200"
              >
                All Posts
              </Link>
            </div>

            <div className="flex-1 text-right">
              {next && (
                <Link 
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col hover:text-green-300 transition-colors duration-200"
                >
                  <span className="text-sm text-green-500">Next →</span>
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

// ... (generateStaticParams and generateMetadata remain the same)