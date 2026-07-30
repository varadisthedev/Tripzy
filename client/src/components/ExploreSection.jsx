import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Compass,
  MapPin,
  BarChart2,
  Sparkles,
  CalendarDays,
  Plane,
  ArrowRight,
} from "lucide-react";
import { exploreSteps } from "../data/destinations";

const iconMap = {
  Compass,
  MapPin,
  BarChart2,
  Sparkles,
  CalendarDays,
  Plane,
};

function TimelineCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;
  const Icon = iconMap[step.icon] || Compass;

  return (
    <div ref={ref} className="relative flex items-center w-full mb-0">

      {/* ── LEFT SIDE ── */}
      <div className="flex-1 flex justify-end pr-8 lg:pr-12">
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xs rounded-2xl p-5 border border-[#a6e1fa]"
            style={{
              background: "#a6e1fa",
              boxShadow: "0 8px 30px rgba(166,225,250,0.35), 0 1px 0 rgba(255,255,255,0.6) inset",
            }}
          >
            {/* Step label */}
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#00072d]/50 mb-1 font-sans-dm">
              Step {index + 1}
            </p>

            {/* Icon + Title row */}
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,7,45,0.1)" }}
              >
                <Icon size={18} strokeWidth={2.2} color="#00072d" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#00072d] leading-tight">
                {step.label}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-[#00072d]/80 leading-relaxed font-sans-dm font-medium">
              {step.description}
            </p>
          </motion.div>
        ) : (
          /* Empty spacer on left for right-side cards */
          <div className="w-full max-w-xs" />
        )}
      </div>

      {/* ── CENTER TIMELINE NODE ── */}
      <div className="flex-shrink-0 flex flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#386FA4]"
          style={{
            background: "linear-gradient(135deg, #133C55, #386FA4)",
            boxShadow: "0 0 0 4px rgba(56,111,164,0.2)",
          }}
        >
          <span className="text-white text-[11px] font-black font-display">
            {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>
      </div>

      {/* ── RIGHT SIDE ── */}
      <div className="flex-1 flex justify-start pl-8 lg:pl-12">
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xs rounded-2xl p-5 border border-[#a6e1fa]"
            style={{
              background: "#a6e1fa",
              boxShadow: "0 8px 30px rgba(166,225,250,0.35), 0 1px 0 rgba(255,255,255,0.6) inset",
            }}
          >
            {/* Step label */}
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#00072d]/50 mb-1 font-sans-dm">
              Step {index + 1}
            </p>

            {/* Icon + Title row */}
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,7,45,0.1)" }}
              >
                <Icon size={18} strokeWidth={2.2} color="#00072d" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#00072d] leading-tight">
                {step.label}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-[#00072d]/80 leading-relaxed font-sans-dm font-medium">
              {step.description}
            </p>
          </motion.div>
        ) : (
          /* Empty spacer on right for left-side cards */
          <div className="w-full max-w-xs" />
        )}
      </div>
    </div>
  );
}

export default function ExploreSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });



  return (
    <section
      id="explore-section"
      className="relative py-28 px-6 overflow-hidden bg-[#F4F9FD]"
    >
      {/* Background ambient glows */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 -translate-y-1/2 pointer-events-none"
        style={{ background: "#a6e1fa", filter: "blur(90px)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-20 translate-y-1/2 pointer-events-none"
        style={{ background: "#84D2F6", filter: "blur(90px)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ─── Section Heading ─── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#386FA4] mb-4 font-sans-dm">
            How It Works
          </p>
          <h2
            className="font-display font-black text-[#133C55] leading-tight mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            One country.{" "}
            <span className="text-gradient-sky">A thousand journeys.</span>
          </h2>
          <p className="text-[#133C55]/75 text-lg max-w-2xl mx-auto leading-relaxed font-sans-dm font-medium">
            From the Himalayas to the Indian Ocean, discover destinations,
            experiences, and journeys shaped around the way{" "}
            <em className="text-[#386FA4] not-italic font-bold">
              you want to travel
            </em>
            .
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 h-1 w-20 rounded-full origin-center"
            style={{ background: "linear-gradient(90deg, #386FA4, #84D2F6)" }}
          />
        </motion.div>

        {/* ─── Timeline ─── */}
        <div className="relative">

          {/* Vertical center line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-5 bottom-5 w-0.5 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #386FA4, #84D2F6, #386FA4)" }}
          />

          {/* Cards */}
          <div className="flex flex-col gap-10">
            {exploreSteps.map((step, i) => (
              <TimelineCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Link to="/signup">
            <motion.button
              id="plan-trip-explore-cta"
              whileHover={{ scale: 1.06, boxShadow: "0 12px 35px rgba(56,111,164,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white tracking-wide"
              style={{
                background: "linear-gradient(135deg, #386FA4 0%, #133C55 100%)",
                boxShadow: "0 8px 30px rgba(56,111,164,0.25)",
              }}
            >
              Start Planning Your Journey
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
