// app/page.tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ImpactStrip from "@/components/ImpactStrip";
import SelectedWork from "@/components/SelectedWork";
import Experience from "@/components/Experience";
import Consulting from "@/components/Consulting";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg">
      <Nav />
      <main id="main-content">
        <Hero />
        <ImpactStrip />
        <SelectedWork />
        <Experience />
        <Consulting />
        <Capabilities />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
