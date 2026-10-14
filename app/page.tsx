import MotionPreferences from "@/components/motion-preferences"
import SpatialEffects from "@/components/spatial-effects"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Skills from "@/components/skills"

export default function Home() {
  return (
    <MotionPreferences><div className="min-h-screen bg-background dark">
      <SpatialEffects />
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div></MotionPreferences>
  )
}

