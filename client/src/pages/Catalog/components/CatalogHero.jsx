import React, { useState } from "react";
import { motion } from "framer-motion";
import airplaneImg from "../../../assets/images/Airplane.png";
import BoardingPassSearch from "./BoardingPassSearch";
import { createSearchHistory } from "../../../lib/authApi";

export default function CatalogHero() {
  const [searchNotice, setSearchNotice] = useState("");

  const handleSearch = async (search) => {
    const from = search.fromCity?.trim();
    const to = search.whereTo?.trim();
    const query = from && to ? `${from} to ${to}` : to || from || "New search";

    try {
      await createSearchHistory({
        query,
        filters: {
          fromCity: search.fromCity,
          whereTo: search.whereTo,
          startDate: search.startDate,
          endDate: search.endDate,
          budget: search.budget,
          ...search.filters,
        },
      });
      setSearchNotice("Saved — you'll see this on your dashboard.");
    } catch {
      // Best-effort: an anonymous visitor or a transient failure shouldn't
      // block browsing, so we just skip the confirmation silently.
      setSearchNotice("");
    }
  };

  return (
    <section className="relative overflow-visible bg-gradient-to-b from-[#EBF3FF] via-[#F4F8FF] to-[#F7F9FC] pt-32 md:pt-36 pb-10 px-6 rounded-b-[40px] shadow-sm">
      
      {/* ── Seamless Dotted Flight Path connecting Left Heading to Right Airplane ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg
          className="w-full h-full text-[#1C3F94] opacity-25"
          viewBox="0 0 1200 400"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Continuous Curved Flight Trail */}
          <path
            d="M 120 160 Q 380 40 750 180 T 1150 100"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          {/* Start Pin Dot on Left */}
          <circle cx="120" cy="160" r="5" fill="currentColor" />
          <circle cx="120" cy="160" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          
          {/* Mid Flight Waypoint Dot */}
          <circle cx="580" cy="120" r="3.5" fill="currentColor" />

          {/* End Flight Trail Dot near Airplane */}
          <circle cx="1150" cy="100" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col relative z-10">
        
        {/* ── Top Hero Row: Left Text + 3D Airplane (Close Together) ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-start justify-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#133C55] tracking-tight leading-tight">
              Ready to{" "}
              <span className="font-['Playfair_Display'] italic font-normal text-[#1C3F94] ml-1">
                Explore?
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 mt-3 max-w-md leading-relaxed">
              We've handpicked the best packages for your journey.
            </p>
          </motion.div>

          {/* Right 3D Airplane (Shifted right & larger size) */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center md:justify-end pointer-events-none"
          >
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={airplaneImg}
              alt="Commercial Flight Booking Services Airplane"
              className="w-auto max-h-[260px] sm:max-h-[320px] md:max-h-[380px] lg:max-h-[420px] object-contain drop-shadow-2xl translate-x-4 md:translate-x-12 lg:translate-x-16"
            />
          </motion.div>

        </div>

        {/* ── Centered Heading Above Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8 md:mt-10 mb-5"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#133C55] tracking-tight">
            Where Would You Like to Go?
          </h2>
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-500 mt-1 max-w-xl mx-auto">
            Tell us your travel plans, and we'll find the perfect package.
          </p>
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <BoardingPassSearch onSearch={handleSearch} />
          {searchNotice && (
            <p className="text-center text-sm font-medium text-[#0f766e] mt-3">{searchNotice}</p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
