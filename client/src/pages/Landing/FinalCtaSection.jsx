import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCtaSection({ onOpenAuth }) {
  return (
    <section
      id="final-cta"
      className="relative py-28 px-6 overflow-hidden bg-white text-center"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "linear-gradient(135deg, #386FA4, #14b8a6)", filter: "blur(120px)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-10 sm:p-16 border border-[#386FA4]/15 bg-gradient-to-b from-[#F4F9FD] to-white shadow-xl relative overflow-hidden"
        >
          {/* Subtle watermark stamp */}
          <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.06]">
            <svg width="220" height="220" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="33" fill="none" stroke="#133C55" strokeWidth="2" strokeDasharray="4 3" />
              <text x="50%" y="45%" textAnchor="middle" fill="#133C55" fontSize="8" fontFamily="sans-serif" fontWeight="bold">TRIPZY</text>
              <text x="50%" y="65%" textAnchor="middle" fill="#133C55" fontSize="12">✈</text>
            </svg>
          </div>

          <h2 className="font-display font-black text-[#0f2442] text-3xl sm:text-5xl lg:text-6xl mb-4 tracking-tight">
            Your next journey starts here.
          </h2>
          <p className="text-[#133C55]/75 text-lg sm:text-xl font-sans-secondary font-semibold mb-10">
            Plan smarter. Explore more.
          </p>

          <motion.button
            id="plan-trip-final-cta"
            onClick={() => onOpenAuth?.("signup")}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 35px rgba(56, 111, 164, 0.45)",
            }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-bold text-white tracking-wide transition-all shadow-lg"
            style={{
              background: "linear-gradient(135deg, #386FA4 0%, #133C55 100%)",
            }}
          >
            <span>Plan a Trip</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
