import Image from "next/image";

export default function Footer() {
  return (
    <section className="flex flex-col justify-center items-center w-full min-h-screen">
      <Image
        className="rounded-lg"
        src="/imgs/profile.jpeg"
        width={300}
        height={500}
        alt="Image of Ahmad Dzuizz Annajib wearing NUS High School's very own Physics Interest Group (Quanta) shirt when helping out during NUS High School Open House 2024"
      />
      <div className="text-xs font-mono">photo credits: Kai Ming</div>
    </section>
  );
}

