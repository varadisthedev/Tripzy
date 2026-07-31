import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { destinations } from "../../data/destinations";

/* ─── tiny helper ─── */
const wrap = (idx, len) => ((idx % len) + len) % len;

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [cardIdx, setCardIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [bgLoaded, setBgLoaded] = useState({});

  const dest = destinations[activeIdx];

  /* ─── auto-rotate destination every 6.5s ─── */
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIdx((i) => wrap(i + 1, destinations.length));
      setCardIdx(0);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  /* ─── preload background images ─── */
  useEffect(() => {
    destinations.forEach((d, i) => {
      if (bgLoaded[i]) return;
      const img = new Image();
      img.src = d.bgImage;
      img.onload = () => setBgLoaded((prev) => ({ ...prev, [i]: true }));
    });
  }, []);

  const goTo = useCallback(
    (idx) => {
      setDirection(idx > activeIdx ? 1 : -1);
      setActiveIdx(wrap(idx, destinations.length));
      setCardIdx(0);
    },
    [activeIdx]
  );

  const nextCard = () => setCardIdx((i) => wrap(i + 1, dest.places.length));
  const prevCard = () => setCardIdx((i) => wrap(i - 1, dest.places.length));

  /* ─── animation variants ─── */
  const textVariants = {
    initial: (dir) => ({ opacity: 0, y: dir > 0 ? 30 : -30 }),
    animate: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -30 : 30 }),
  };

  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden bg-slate-950" id="hero">
      {/* ── Dynamic Cinematic Backgrounds with Slow Ken Burns Motion ── */}
      {destinations.map((d, i) => (
        <div
          key={`bg-${i}`}
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            transition: "opacity 1.4s ease-in-out",
            zIndex: i === activeIdx ? 1 : 0,
          }}
        >
          {i === activeIdx ? (
            <motion.img
              src={d.bgImage}
              alt={d.name}
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 7, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: "saturate(1.2) contrast(1.06) brightness(0.92)",
              }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ) : (
            <img
              src={d.bgImage}
              alt={d.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: "saturate(1.2) contrast(1.06) brightness(0.92)",
              }}
              loading="lazy"
            />
          )}
        </div>
      ))}

      {/* ── Atmospheric Ambient Lighting Glow ── */}
      <div
        className="absolute top-1/3 left-10 w-96 h-96 rounded-full pointer-events-none opacity-25 transition-all duration-1000"
        style={{
          background: dest.accent || "#59A5D8",
          filter: "blur(130px)",
          zIndex: 2,
        }}
      />

      {/* ── Dark Vignette & Edge Shadow Layer ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: `
            radial-gradient(ellipse at center, transparent 25%, rgba(2, 6, 18, 0.6) 70%, rgba(2, 6, 18, 0.95) 100%),
            linear-gradient(90deg, rgba(2, 6, 18, 0.85) 0%, rgba(2, 6, 18, 0.4) 45%, rgba(2, 6, 18, 0.2) 100%),
            linear-gradient(180deg, rgba(2, 6, 18, 0.7) 0%, transparent 30%, transparent 60%, rgba(2, 6, 18, 0.85) 100%)
          `,
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pb-16 pt-28">

          {/* ══ LEFT — Text Written Directly On Background ══ */}
          <div className="flex-1 max-w-xl">
            {/* Destination dot indicators */}
            <div className="flex items-center gap-2 mb-6">
              {destinations.map((d, i) => (
                <button
                  key={d.id}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-500 rounded-full ${i === activeIdx
                    ? "w-9 h-2 bg-[#91E5F6] shadow-[0_0_12px_rgba(145,229,246,0.8)]"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white"
                    }`}
                  aria-label={d.name}
                />
              ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${activeIdx}`}
                custom={direction}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                

                {/* Main Destination Title */}
                <h1
                  className="font-display font-black text-white leading-none mb-3 drop-shadow-2xl"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", letterSpacing: "-0.02em" }}
                >
                  {dest.name}
                </h1>

                {/* Tagline */}
                <p className="font-display italic text-[#84D2F6] text-xl lg:text-2xl mb-4 font-medium drop-shadow-md">
                  "{dest.tagline}"
                </p>

                {/* Description */}
                <p className="text-white/90 text-base lg:text-lg leading-relaxed mb-8 font-sans-dm font-medium max-w-md drop-shadow">
                  {dest.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/signup">
                    <motion.button
                      id="plan-trip-hero-cta"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 35px rgba(56, 111, 164, 0.6)",
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white tracking-wide transition-all"
                      style={{
                        background: "linear-gradient(135deg, #386FA4 0%, #133C55 100%)",
                        boxShadow: "0 6px 24px rgba(56,111,164,0.45)",
                      }}
                    >
                      Plan a Trip Now
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ y: 3 }}
                    className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-bold transition-colors"
                    onClick={() => {
                      document
                        .getElementById("explore-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Explore India
                    <ChevronDown size={16} />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ══ RIGHT — Horizontal Destination Cards Carousel ══ */}
          <div className="flex-shrink-0 w-full lg:w-auto">

            {/* Cards row */}
            <div className="flex items-end gap-3 overflow-x-visible">
              {/* Prev button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevCard}
                className="flex-shrink-0 glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#91E5F6] self-center shadow-lg bg-black/30 backdrop-blur-md border border-white/20"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </motion.button>

              {/* 3 visible cards */}
              <div className="flex items-end gap-3">
                {[-1, 0, 1].map((offset) => {
                  const placeIdx = wrap(cardIdx + offset, dest.places.length);
                  const place = dest.places[placeIdx];
                  const isActive = offset === 0;
                  return (
                    <AnimatePresence key={`${activeIdx}-${placeIdx}`} mode="wait">
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: 60, scale: 0.85 }}
                        animate={{
                          opacity: isActive ? 1 : offset === 1 ? 0.85 : 0.65,
                          x: 0,
                          scale: isActive ? 1 : 0.88,
                        }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => !isActive && setCardIdx(placeIdx)}
                        className={`relative rounded-3xl overflow-hidden cursor-pointer flex-shrink-0 shadow-2xl transition-all border-4 border-white ${isActive ? "ring-4 ring-white/40 shadow-white/20" : "opacity-85"
                          }`}
                        style={{
                          width: isActive ? "185px" : "145px",
                          height: isActive ? "245px" : "195px",
                        }}
                        whileHover={{ scale: isActive ? 1.03 : 0.93 }}
                      >
                        {/* Clear Card Image */}
                        <img
                          src={place.image}
                          alt={place.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />

                        {/* Gradient overlay at bottom of card only */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Active accent top bar */}
                        {isActive && (
                          <motion.div
                            layoutId="card-accent"
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#59A5D8] to-[#91E5F6]"
                          />
                        )}

                        {/* Card content */}
                        <div className="absolute bottom-0 left-0 right-0 p-3.5">
                          <p className="text-white font-bold text-sm leading-tight drop-shadow">
                            {place.name}
                          </p>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-[#91E5F6] text-xs font-semibold mt-0.5 leading-tight"
                            >
                              {place.tag}
                            </motion.p>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  );
                })}
              </div>

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextCard}
                className="flex-shrink-0 glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#91E5F6] self-center shadow-lg bg-black/30 backdrop-blur-md border border-white/20"
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Card dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {dest.places.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCardIdx(i)}
                  className={`rounded-full transition-all duration-300 ${i === cardIdx ? "w-4 h-1.5 bg-[#91E5F6]" : "w-1.5 h-1.5 bg-white/40"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-[#91E5F6] to-transparent" />
        <span className="text-[#91E5F6]/80 text-[10px] font-bold tracking-widest uppercase font-sans-dm">
          scroll
        </span>
      </motion.div>
    </section>
  );
}
