# dzuizz.com | personal portfolio

A visually rich, Kuromi-themed personal portfolio website built with modern web technologies. This site showcases my journey, projects, achievements, and blog posts with a cohesive aesthetic.

![Kuromi Hero](/public/kuromi-hero.png)

## ✨ features

- **aesthetic design:** custom kuromi-inspired theme with dark/light mode support.
- **dynamic blog:** markdown-powered blog with custom frontmatter parsing.
- **achievements timeline:** a comprehensive list of awards and certifications with direct links to credentials.
- **photo gallery:** curated collection of photos and memories.
- **responsive & fast:** built with next.js 16 and tailwind css 4 for optimal performance and responsiveness.
- **interactive elements:** smooth transitions, hover effects, and custom-themed components.

## 🛠️ tech stack

- **framework:** [next.js 16](https://nextjs.org/) (app router)
- **styling:** [tailwind css 4](https://tailwindcss.com/) + custom css variables
- **language:** [typescript](https://www.typescriptlang.org/)
- **icons:** [lucide react](https://lucide.dev/) + custom icons
- **content:** markdown (blog), json (achievements & photos)
- **deployment:** [vercel](https://vercel.com/) (recommended)

## 📁 project structure

```text
├── app/              # next.js app router pages, layouts, and global styles
├── components/       # reusable react components (hero, projects, etc.)
├── content/          # markdown blog posts and photo manifests
├── lib/              # utility functions for content processing
├── public/           # static assets (images, certificates, icons)
│   └── certs/        # scanned certificates and awards
└── tsconfig.json     # typescript configuration
```

## 🚀 getting started

### prerequisites

- node.js >= 20.9.0
- npm or yarn

### installation

1. clone the repository:
   ```bash
   git clone https://github.com/dzuizz/dzuizz.com.git
   cd dzuizz.com
   ```

2. install dependencies:
   ```bash
   npm install
   ```

3. run the development server:
   ```bash
   npm run dev
   ```

4. open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 contributing

contributions are welcome! whether it's fixing a bug, adding a feature, or improving documentation, feel free to help out.

1. **fork** the repository.
2. **create** a new branch: `git checkout -b feature/your-feature-name`.
3. **commit** your changes: `git commit -m 'add some amazing feature'`.
4. **push** to the branch: `git push origin feature/your-feature-name`.
5. **open** a pull request.

please ensure your code follows the existing style and passes linting.

## 📝 upcoming features

- [ ] (possibly) cloud db + auth setup for easier achievements editing + storage

## 📄 license

this project is licensed under the [MIT License](LICENSE).

---
_~ dzuizz_
