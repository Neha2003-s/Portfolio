import { useState } from "react"
import { useLenis } from "@/hooks/useLenis"
import { Hero } from "@/components/sections/Hero"
import { Ticker } from "@/components/ui/ticker"
import { About } from "@/components/sections/About"
import { Work } from "@/components/sections/Work"
import { Experience } from "@/components/sections/Experience"
import { Footer } from "@/components/sections/Footer"
import { Nav } from "@/components/sections/Nav"
import { SparkleBackground } from "@/components/ui/sparkle-background"
import { LoadingScreen } from "@/components/ui/loading-screen"

function App() {
  useLenis()
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className="fixed inset-0 z-0 pointer-events-none">
        <SparkleBackground mode="background" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/10 via-transparent to-[#0a0a0a]/60" />
      </div>
      
      <div className="relative z-10">
        <Hero />
        <Ticker />
        <About />
        <Work />
        <Experience />
        <Footer />
        <Nav />
      </div>

      <div className="fixed inset-0 z-20 pointer-events-none">
        <SparkleBackground mode="foreground" />
      </div>
    </main>
  )
}

export default App
