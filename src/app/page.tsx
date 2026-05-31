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
    <main className="relative">
      <Navbar />

      {/* 1. Big landing hero */}
      <Hero />

      {/* 2. Who am I — terminal whoami */}
      <About />

      {/* 3. Technical toolbox — file tree */}
      <Skills />

      {/* 4. Featured projects */}
      <Projects />

      {/* 5. Experience timeline */}
      <Timeline />

      {/* 6. Bento contact grid — at the very end */}
      <BentoContact />

      <Footer />
      <BackToTop />
    </main>
  );
}
