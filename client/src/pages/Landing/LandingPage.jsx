import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import FaqSection from "./FaqSection";
import FinalCtaSection from "./FinalCtaSection";
import Footer from "../../components/layout/Footer";
import AuthModal from "../../components/ui/AuthModal";

export default function LandingPage() {
  const [authModal, setAuthModal] = useState(null); // null | "login" | "signup"

  return (
    <div className="min-h-screen bg-[#F4F9FD]">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
        <FinalCtaSection onOpenAuth={(tab) => setAuthModal(tab)} />
      </main>
      <Footer onOpenAuth={(tab) => setAuthModal(tab)} />

      {/* Auth Modal Triggered from Final CTA or Footer */}
      {authModal && (
        <AuthModal
          defaultTab={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}
    </div>
  );
}
