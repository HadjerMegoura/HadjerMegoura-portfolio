import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import TechStack from "./components/sections/TechStack";
import Contact from "./components/sections/Contact";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useSpotlight } from "./hooks/useSpotlight";
import "./App.css";

function App() {
  useScrollReveal();
  useSpotlight();

  return (
    <div className="portfolio-shell">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
