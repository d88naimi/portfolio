import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-bg">
      {/* Warm gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full opacity-30 blur-3xl"
          style={{
            width: 700,
            height: 700,
            top: "-15%",
            right: "-15%",
            background: "radial-gradient(circle, #f2d4bf 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{
            width: 500,
            height: 500,
            bottom: "10%",
            left: "-10%",
            background: "radial-gradient(circle, #e8d5bf 0%, transparent 70%)",
          }}
        />
      </div>

      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
