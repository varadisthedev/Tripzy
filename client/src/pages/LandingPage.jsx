import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ExploreSection from "../components/ExploreSection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#F4F9FD" }}>
      <Navbar />
      <main>
        <HeroSection />
        <ExploreSection />
      </main>
      <Footer />
    </div>
  );
}
