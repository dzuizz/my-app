import About from "@/components/About"
import Achievements from "@/components/Achievements"
import Projects from "@/components/Projects"
import ReachMe from "@/components/ReachMe"

export default function Home() {
  return <div className="min-h-screen">
    <About />
    <Achievements />
    <Projects />
    <ReachMe />
  </div>
}
