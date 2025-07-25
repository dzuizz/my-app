import { Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Hero() {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/ahmad.dzuizz.annajib/',
      icon: <Instagram size={20} />
    },
    {
      name: 'Twitter',
      href: 'https://x.com/AhmadDzuizz/',
      icon: <Twitter size={20} />
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/dzuizz/',
      icon: <Linkedin size={20} />
    },
    {
      name: 'GitHub',
      href: 'https://github.com/dzuizz',
      icon: <Github size={20} />
    },
  ];

  return (
    <section className="max-w-3xl mx-auto py-8 px-4">
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Ahmad Dzuizz Annajib
          </h1>
          <h2 className="text-lg text-gray-600">
            Competitive Programmer • NUS High School of Math and Science
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 pt-1">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.href}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
