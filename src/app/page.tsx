import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { Timeline } from "@/components/timeline/timeline";
import { Contact } from "@/components/contact/contact";
import { Footer } from "@/components/footer/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <main className="relative">
      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
