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
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-12 text-center text-4xl font-bold">Blog</h1>
      <ul className="space-y-8">
        {posts
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post) => (
            <li
              key={post.slug}
              className="rounded-lg border p-4 transition-shadow hover:shadow-lg"
            >
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
