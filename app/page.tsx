import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import Achievements from "@/components/Achievements"
import Projects from "@/components/Projects"
import Extras from "@/components/Extras"
import Footer from "@/components/Footer"
import { getPinnedPosts } from "@/lib/blog"
import { getPinnedPhotos } from "@/lib/photos"

export default function Home() {
  const pinnedPosts = getPinnedPosts()
  const pinnedPhotos = getPinnedPhotos()

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Achievements />
      <Projects />
      <Extras pinnedPosts={pinnedPosts} pinnedPhotos={pinnedPhotos} />
      <Footer />
    </div>
  )
}
