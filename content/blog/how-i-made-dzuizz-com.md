---
title: How I made dzuizz.com
date: 2026-04-07
excerpt: A walkthrough of how I built my personal site - the stack, the design decisions, and what I learned.
pinned: true
---

## Why build a personal site?

I wanted a place on the internet that's mine. Not a GitHub profile. Not a LinkedIn page. Just something _I_ designed from zero. It also felt like a good excuse to get comfortable with the modern Next.js ecosystem.

## The stack

- **Next.js 15** (App Router): React Server Components make it easy to mix static content with dynamic data without shipping unnecessary JS to the client.
- **Tailwind CSS v4**: utility-first styles with a custom design token system. No component library; everything is hand-rolled.
- **TypeScript**: types everywhere, no exceptions.
- **Netlify**: zero-config deploys on every push to `main`.

No database, no CMS, no auth.

1. Blog posts = Markdown files parsed at build time.
2. Photos metadata = JSON file I edit myself.

## Design system

The theme is **HEAVILY** inspired by KUROMI! dark purples, hot pinks, and a lot of glow. I defined a small set of CSS custom properties (`--bg`, `--surface`, `--card`, `--pink`, `--purple`, ...) and built everything on top of those. Light mode just swaps the values; every component gets it for free.

The background is a single radial-gradient layer on the page wrapper so gradients blend naturally across sections instead of hard-cutting at every section boundary. (an issue i had some time ago)

## Blog

Posts are `.md` files in `content/blog/`. A small TypeScript module reads them with `fs` at build time, parses frontmatter, and exposes typed `BlogPost` objects.

## What I'd do differently

If I were starting today I'd probably reach for MDX instead of the hand-rolled Markdown parser; it would let me embed React components directly in posts without hacking around the renderer. But for a site this size, the current approach is fast and zero-dependency.

## Takeaways

Building your own site from scratch, even a small one, forces you to make real decisions about every layer of the stack. You can't hide behind framework magic. This is where I learnt everything. ❤️
