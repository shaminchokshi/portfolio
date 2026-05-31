import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import AvatarJourneyMount from "@/components/AvatarJourneyMount";
import PipeMount from "@/components/Pipemount";
import BackgroundFX from "@/components/BackgroundFX";

export default function Page() {
  return (
    <main className="relative">
      <BackgroundFX />
      <div className="grain pointer-events-none fixed inset-[-200%] -z-[9] opacity-[0.035]" />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <AvatarJourneyMount />
      <PipeMount />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}