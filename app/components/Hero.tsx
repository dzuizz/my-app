import Link from "next/link";

export default function Hero() {
  return (
    <section className="pb-6">
      <h1 className="text-3xl text-slate-50 leading-10 font-bold">Ahmad Dzuizz Annajib</h1>
      <h2 className="text-lg text-slate-200 mt-1 mb-6"><Link href="https://www.nushigh.edu.sg/" className="font-medium text-slate-50 dark:text-blue-500 hover:underline">NUS High School of Math & Science</Link><br /><Link href="https://www.afkaaruna.sch.id/" className="font-medium text-slate-50 dark:text-blue-500 hover:underline">MTs Afkaaruna Islamic School</Link></h2>
      <p className="text-md text-slate-400">
        I think my life through code, and <br />
        code through my life.
      </p>
    </section>
  )
}
