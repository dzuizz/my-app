import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function BlogIndex() {
  const blogDir = path.join(process.cwd(), 'blog-content');
  const filenames = fs.readdirSync(blogDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const slug = filename.replace('.md', '');
    return { slug, title: data.title, date: data.date, description: data.description };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <div>
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-600">{post.description}</p>
                <small className="text-gray-500">{post.date}</small>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
