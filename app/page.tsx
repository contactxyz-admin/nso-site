import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MissingLayer from "@/components/MissingLayer";
import SeamTeaser from "@/components/SeamTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-canvas min-h-screen">
      <Nav />
      <Hero />
      <MissingLayer />
      <SeamTeaser />
      <Footer />
    </main>
  );
}
