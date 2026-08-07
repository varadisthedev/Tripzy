import React from "react";
import UserNavbar from "../../components/layout/UserNavbar";
import CatalogHero from "./components/CatalogHero";
import TopPicksSection from "./components/TopPicksSection";

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <CatalogHero />
      
      {/* ── Top 3 Picks for You Section ── */}
      <TopPicksSection />

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {/* Additional catalog cards and filtering will continue here */}
      </main>
    </div>
  );
}
