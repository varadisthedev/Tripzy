import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import ExploreSection from "./ExploreSection";
import Footer from "../../components/layout/Footer";

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
