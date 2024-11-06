---
title: "How I built this blog"
date: "2024-08-27"
description: "A detailed guide on how I built this blog using Next.js and Tailwind CSS."
---

# How I built this blog

Welcome to my blog! In this post, I'll walk you through the process of how I created this blog using Next.js and Tailwind CSS. Whether you're new to web development or just curious about how things work behind the scenes, this guide should give you a good overview.

## Setting Up the Project

The first step was setting up a new Next.js project. Next.js is a powerful React framework that provides server-side rendering, static site generation, and many other features out of the box.

To start, I created a new Next.js app:

```bash
npx create-next-app@latest my-blog
cd my-blog
```

After setting up the basic project, I configured the project to use the new `app/` directory structure introduced in Next.js 13, which simplifies routing and layouts.

## Adding Tailwind CSS

Next, I added Tailwind CSS for styling. Tailwind CSS is a utility-first CSS framework that allows for rapid UI development.

Here's how I installed and configured Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

I then added the required Tailwind directives to my global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Creating the Blog Structure

For the blog itself, I decided to use Markdown files to write my posts. Each post is stored in a `blog-content` directory, making it easy to manage and edit content.

### Setting Up the Blog Index Page

The blog index page lists all the posts and links to each one. I used the `fs` and `path` modules in Node.js to read the files from the `blog-content` directory and generate the list of posts.

Here�s a snippet of the code:

```tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

export default function BlogIndex() {
  const blogDir = path.join(process.cwd(), "blog-content");
  const filenames = fs.readdirSync(blogDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    const slug = filename.replace(".md", "");
    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
    };
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <small className="text-gray-500">{post.date}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Setting Up the Blog Post Pages

Each blog post is displayed on its own page. I used `ReactMarkdown` to render the Markdown content and `gray-matter` to parse the frontmatter metadata.

Here's the basic structure of a blog post page:

```tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), "blog-content", `${params.slug}.md`);
  const fileContent = fs.readFileSync(blogDir, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-6">{data.date}</p>
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </div>
  );
}
```

<!--
## Styling the Blog

I wanted the blog to have a clean, modern look, similar to dzuizz.com. I used Tailwind CSS�s utility classes to style the blog posts and pages, focusing on readability and simplicity.

For example, the `.prose` class provided by Tailwind's typography plugin ensures that the Markdown content is beautifully formatted:

```bash
npm install @tailwindcss/typography
```

Then, I added the plugin to the Tailwind config:

```js
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
```
-->

## Deploying the Blog

Finally, I deployed the blog using Vercel, which provides seamless integration with Next.js. The deployment process was straightforward and my blog was live within minutes.

## Conclusion

Building this blog was a great learning experience and allowed me to explore some powerful tools and frameworks. I hope this guide helps you understand the steps involved in creating a blog like this one. Stay tuned for more posts as I continue to explore and share my journey!

Thanks for reading!
