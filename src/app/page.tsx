import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { Timeline } from "@/components/timeline/timeline";
import { BentoContact } from "@/components/contact/bento-contact";
import { Footer } from "@/components/footer/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />

      <Hero />

      <Projects />

      <About />

      <Skills />

      <Timeline />

      <BentoContact />

      <Footer />
      <BackToTop />
    </main>
  );
}
