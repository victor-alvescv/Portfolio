import "./App.css"
import { useEffect } from "react"
import MouseFollower from "./components/MouseFollower"
import Header from "./components/Header"
import About from "./components/About"
import TechStack from "./components/TechStack"
import Projects from "./components/Projects"
import Resume from "./components/Resume"
import Footer from "./components/Footer"

function App() {
  async function initLocomotiveScroll() {
    const LocomotiveScroll = (await import("locomotive-scroll")).default
    new LocomotiveScroll()
  }

  useEffect(() => {
    initLocomotiveScroll()
  }, [])

  return (
    <main>
      <MouseFollower />
      <Header />
      <About />
      <TechStack />
      <Projects />
      <Resume />
      <Footer />
    </main>
  )
}

export default App
