import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import TerrainData from "@/components/TerrainData";
import DevelopmentPotential from "@/components/DevelopmentPotential";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Neighborhood from "@/components/Neighborhood";
import Documents from "@/components/Documents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-950">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TerrainData />
      <DevelopmentPotential />
      <Gallery />
      <Location />
      <Neighborhood />
      <Documents />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
