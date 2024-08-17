import Link from "next/link";

export default function About() {
  return (
    <section className="pb-6">
      {/* <h3 className="py-4 bg-cetascean-blue text-slate-50 uppercase font-bold tracking-wider sticky top-0">About</h3> */}
      <article className="">
        {/*
        Back in primary school @ <Link href="https://www.irsyad.sg/" className="font-medium text-slate-50 dark:text-blue-500 hover:underline">Madrasah Irsyad Zuhri Al-Islamiah</Link>, my world was opened to math olympiads.
        The idea of solving problems with logic and creativity was fascinating. I loved it and continued to participate in these math competitions and coding competitions.
        I was also introduced to the world of computers. The internet. Simply marvellous. <br /><br />
        Fast forward to now, I am studying at <Link href="https://www.nushigh.edu.sg/" className="font-medium text-slate-50 dark:text-blue-500 hover:underline">NUS High School of Math and Science</Link>.
        I still love making things happen with technology. Web development, competitive programming, computer hardware ... you name it! <br /><br />
        Here are some of my coding profiles: <br />
        */}
        <strong className="text-slate-50">Instagram</strong> - <Link href="https://www.instagram.com/ahmad.dzuizz.annajib/" className="font-medium dark:text-blue-500 hover:underline">@ahmad.dzuizz.annajib</Link><br />
        <strong className="text-slate-50">Twitter</strong> - <Link href="https://www.twitter.com/AhmadDzuizz" className="font-medium dark:text-blue-500 hover:underline">@AhmadDzuizz</Link><br />
        <strong className="text-slate-50">LinkedIn</strong> - <Link href="https://www.linkedin.com/in/dzuizz/" className="font-medium dark:text-blue-500 hover:underline">Ahmad Dzuizz Annajib</Link><br />
        <strong className="text-slate-50">Facebook</strong> - <Link href="https://www.facebook.com/profile.php?id=61556184766730" className="font-medium dark:text-blue-500 hover:underline">Ahmad Dzuizz Annajib</Link><br />
        <br />
        <strong className="text-slate-50">Codebreaker</strong> - <Link href="https://www.codebreaker.xyz/profile/dzuizz" className="font-medium dark:text-blue-500 hover:underline">dzuizz</Link><br />
        <strong className="text-slate-50">Codeforces</strong> - <Link href="https://www.codeforces.com/profile/dzuizz" className="font-medium dark:text-blue-500 hover:underline">dzuizz</Link><br />
        <strong className="text-slate-50">Kattis</strong> - <Link href="https://www.open.kattis.com/users/dzuizz" className="font-medium dark:text-blue-500 hover:underline">dzuizz</Link><br />
        <strong className="text-slate-50">TLX</strong> - <Link href="" className="font-medium dark:text-blue-500 hover:underline">Dzuizz</Link><br />
        <strong className="text-slate-50">Github</strong> - <Link href="https://www.github.com/dzuizz" className="font-medium dark:text-blue-500 hover:underline">dzuizz</Link><br />
      </article>
    </section>
  )
}
