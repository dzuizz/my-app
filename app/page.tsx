import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="px-6 pt-16 w-full min-h-screen">
      <Hero />
      <About />
      <Achievements />
      <Footer />
    </main>
  );
}

