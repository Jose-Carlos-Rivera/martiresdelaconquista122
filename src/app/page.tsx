import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TerrainData from "@/components/TerrainData";
import DevelopmentPotential from "@/components/DevelopmentPotential";
import Location from "@/components/Location";
import Neighborhood from "@/components/Neighborhood";
import Documents from "@/components/Documents";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />
      <Hero />
      <TerrainData />
      <DevelopmentPotential />
      <Location />
      <Neighborhood />
      <Documents />
      <Contact />
      <Footer />
    </main>
  );
}
