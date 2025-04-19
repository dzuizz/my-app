export default function Socials() {
  return <section className="">
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {[
        {
          name: 'Instagram',
          link: '@ahmad.dzuizz.annajib',
          href: 'https://www.instagram.com/ahmad.dzuizz.annajib/',
        },
        {
          name: 'Twitter',
          link: '@AhmadDzuizz',
          href: 'https://x.com/AhmadDzuizz/',
        },
        {
          name: 'LinkedIn',
          link: 'dzuizz',
          href: 'https://www.linkedin.com/in/dzuizz/',
        },
        {
          name: 'GitHub',
          link: 'dzuizz',
          href: 'https://github.com/dzuizz',
        },
        {
          name: 'Codeforces',
          link: 'dzuizz',
          href: 'https://codeforces.com/profile/dzuizz',
        },
        {
          name: 'Kattis',
          link: 'dzuizz',
          href: 'https://open.kattis.com/users/dzuizz',
        },
      ].map((social, i) => (
        <div
          key={i}
          className="flex items-center gap-2"
        >
          <a href={social.href} className="">
            λ
          </a>
          <a href={social.href} className="">
            {social.name}
          </a>
          <a href={social.href} className="">
            {social.link}
          </a>
        </div>
      ))}
    </div>
  </section>
}
