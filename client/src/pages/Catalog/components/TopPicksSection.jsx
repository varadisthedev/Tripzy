import React from "react";
import { motion } from "framer-motion";
import { Star, Calendar, Check, Users, ChevronRight, Sparkles } from "lucide-react";

import goaImg from "../../../assets/images/Goa.png";
import kashmirImg from "../../../assets/images/Kashmir.png";
import rajasthanImg from "../../../assets/images/Rajasthan.png";

const topPicksData = [
  {
    id: 1,
    title: "Goa",
    image: goaImg,
    category: "Beach Destination",
    categoryEmoji: "🌴",
    rating: "4.8",
    reviews: "1,254",
    duration: "4 Days • 3 Nights",
    includes: [
      "Flights Included",
      "Breakfast Included",
      "Hotel Included",
      "Sightseeing Included",
    ],
    idealFor: "Ideal for Friends & Couples",
    idealDesc: "Perfect for a fun getaway with your loved ones.",
    price: "₹9,999",
  },
  {
    id: 2,
    title: "Kashmir",
    image: kashmirImg,
    category: "Scenic Escape",
    categoryEmoji: "❄️",
    rating: "4.9",
    reviews: "2,143",
    duration: "6 Days • 5 Nights",
    includes: [
      "Flights Included",
      "Hotel + Houseboat Stay",
      "Breakfast & Dinner",
      "Gulmarg, Sonmarg & Pahalgam",
    ],
    idealFor: "Ideal for Honeymooners & Nature Lovers",
    idealDesc: "Breathtaking snow peaks, pristine valleys & houseboats.",
    price: "₹18,999",
  },
  {
    id: 3,
    title: "Rajasthan (Jaipur + Jaisalmer)",
    image: rajasthanImg,
    category: "Heritage Destination",
    categoryEmoji: "🏜️",
    rating: "4.7",
    reviews: "1,032",
    duration: "5 Days • 4 Nights",
    includes: [
      "Hotel Included",
      "Breakfast Included",
      "Desert Safari",
      "Fort & Palace Tour",
    ],
    idealFor: "Ideal for Families & History Enthusiasts",
    idealDesc: "Explore royal palaces, grand forts & golden sand dunes.",
    price: "₹11,999",
  },
];

export default function TopPicksSection() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      
      {/* ── Section Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D324D] tracking-tight">
            Top 3 Picks for you
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium italic">
          *Estimated pick for you based on popular demand
        </p>
      </div>

      {/* ── 3 Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topPicksData.map((pick, idx) => (
          <motion.div
            key={pick.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="bg-white border-[4px] border-[#0D324D] shadow-[0_10px_30px_rgba(13,50,77,0.12)] hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group"
          >
            {/* ── Card Image Header with Wavy Bottom Curve ── */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={pick.image}
                alt={pick.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Category Badge (Top Left) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0D324D] flex items-center gap-1.5 shadow-md">
                <span>{pick.categoryEmoji}</span>
                <span>{pick.category}</span>
              </div>

              {/* Top Pick Badge (Top Right) */}
              <div className="absolute top-4 right-4 bg-[#0D324D] text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                <Star size={12} className="fill-[#31E981] text-[#31E981]" />
                <span>Top Pick</span>
              </div>

              {/* Wavy Bottom Curve Mask SVG */}
              <svg
                className="absolute -bottom-1 left-0 right-0 w-full h-10 text-white fill-current pointer-events-none"
                viewBox="0 0 500 80"
                preserveAspectRatio="none"
              >
                <path d="M0,30 C150,80 350,0 500,50 L500,80 L0,80 Z" />
              </svg>
            </div>

            {/* ── Card Content Body ── */}
            <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h3 className="text-2xl font-black text-[#0D324D] tracking-tight mb-2">
                  {pick.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-[#0D324D]/10 px-2 py-0.5 rounded-md text-[#0D324D] font-extrabold text-xs">
                    <Star size={13} className="fill-[#0D324D] text-[#0D324D]" />
                    <span>{pick.rating}</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    ({pick.reviews} Reviews)
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#0D324D] mb-4">
                  <Calendar size={15} className="text-[#0D324D]" />
                  <span>{pick.duration}</span>
                </div>

                <div className="border-t border-slate-100 my-4" />

                {/* Includes Grid (2x2) */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {pick.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#0D324D]/10 text-[#0D324D] flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-xs font-semibold text-[#0D324D] truncate">
                        {inc}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ideal For Box */}
                <div className="bg-[#0D324D]/5 border border-[#0D324D]/15 rounded-2xl p-3.5 mb-5">
                  <div className="flex items-center gap-2 text-[#0D324D] font-extrabold text-xs mb-0.5">
                    <Users size={15} className="text-[#0D324D] flex-shrink-0" />
                    <span>{pick.idealFor}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#0D324D]/80 pl-5 leading-tight">
                    {pick.idealDesc}
                  </p>
                </div>
              </div>

              {/* ── Card Footer & CTA Buttons ── */}
              <div>
                <div className="border-t border-slate-100 pt-4 mb-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Starting from
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#0D324D] tracking-tight">
                      {pick.price}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      / Person
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="py-3 px-3 rounded-xl border-2 border-[#0D324D] text-[#0D324D] hover:bg-[#0D324D]/10 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>View Details</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    type="button"
                    className="py-3 px-3 rounded-xl bg-[#31E981] hover:bg-[#28c76f] text-[#0D324D] font-black text-xs flex items-center justify-center gap-1 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Book Now</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Bottom Footer Note inside card */}
                <p className="text-center text-[10px] text-slate-400 font-medium mt-3.5 italic">
                  Our Top Picks • Estimated pick for you
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
