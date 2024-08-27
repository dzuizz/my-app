import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), 'blog-content', `${params.slug}.md`);
  const fileContent = fs.readFileSync(blogDir, 'utf-8');
  const { content, data } = matter(fileContent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.date}</p>
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </div>
  );
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'blog-content');
  const filenames = fs.readdirSync(blogDir);

  return filenames.map((filename) => ({
    slug: filename.replace('.md', ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), 'blog-content', `${params.slug}.md`);
  const fileContent = fs.readFileSync(blogDir, 'utf-8');
  const { data } = matter(fileContent);

  return {
    title: data.title,
    description: data.description,
  };
}

