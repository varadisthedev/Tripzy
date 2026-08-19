import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Compass, Calendar, LineChart, Plane } from "lucide-react";

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      tag: "CHOOSE",
      title: "Tell us where you want to go.",
      description: "Pick any destination across India's vibrant states and heritage circuits.",
      icon: MapPin,
      offsetClass: "lg:translate-y-0",
      color: "#1C39BB",
    },
    {
      num: "02",
      tag: "DISCOVER",
      title: "Pick the places and experiences you want to visit.",
      description: "Browse top attraction recommendations tailored to your trip duration.",
      icon: Compass,
      offsetClass: "lg:translate-y-5",
      color: "#133C55",
    },
    {
      num: "03",
      tag: "PLAN",
      title: "Set your travel dates and duration.",
      description: "Configure when you are traveling and how long you plan to explore.",
      icon: Calendar,
      offsetClass: "lg:translate-y-10",
      color: "#14b8a6",
    },
    {
      num: "04",
      tag: "EXPLORE",
      title: "View travel options, historical prices and predicted fares.",
      description: "Analyze smart price estimates across flight, train, and bus options.",
      icon: LineChart,
      offsetClass: "lg:translate-y-15",
      color: "#2563EB",
    },
    {
      num: "05",
      tag: "GO",
      title: "Get your personalized itinerary and take it with you.",
      description: "Receive your complete day-by-day itinerary ready to save or print.",
      icon: Plane,
      offsetClass: "lg:translate-y-20",
      color: "#0f2442",
    },
  ];

  /* ── Serial active step highlight cycle (0 -> 1 -> 2 -> 3 -> 4) ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section
      id="how-it-works"
      className="relative py-20 px-6 overflow-hidden bg-white"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "#1C39BB", filter: "blur(130px)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-3.5 py-1 rounded-md text-xs font-bold tracking-wider text-[#1C39BB] bg-[#1C39BB]/10 uppercase mb-4 font-sans-secondary border border-[#1C39BB]/20">
            Workflow
          </span>
          <h2 className="font-display font-extrabold text-[#0f2442] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            From destination to departure.
          </h2>
          <p className="text-[#133C55]/75 text-base sm:text-lg leading-relaxed font-sans-secondary font-medium">
            Tell us where you're going. We'll help you figure out the rest.
          </p>
        </motion.div>

        {/* ── CONNECTED STAIRCASE LAYOUT WITH SLOW DRAWING LINE ── */}
        <div className="relative pt-2 pb-24 lg:pb-32">

          {/* Desktop Connected Staircase SVG Line — Appears Slowly */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" overflow="visible" viewBox="0 0 1000 320">
              <defs>
                <linearGradient id="compactStairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1C39BB" />
                  <stop offset="30%" stopColor="#133C55" />
                  <stop offset="60%" stopColor="#14b8a6" />
                  <stop offset="85%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#0f2442" />
                </linearGradient>
              </defs>

              {/* Tighter Connected Stair Path Line — Animates slowly on scroll */}
              <motion.path
                d="M 170 50 L 230 50 L 230 70 L 370 70 L 430 70 L 430 90 L 570 90 L 630 90 L 630 110 L 770 110 L 830 110 L 830 130 L 970 130"
                fill="none"
                stroke="url(#compactStairGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 2.8, ease: "easeInOut" }}
              />

              {/* Stair Joint Dots — Appear serially */}
              {[
                { cx: 230, cy: 50, color: "#1C39BB", delay: 0.6 },
                { cx: 430, cy: 70, color: "#133C55", delay: 1.2 },
                { cx: 630, cy: 90, color: "#14b8a6", delay: 1.8 },
                { cx: 830, cy: 110, color: "#2563EB", delay: 2.4 },
              ].map((dot, i) => (
                <motion.circle
                  key={i}
                  cx={dot.cx}
                  cy={dot.cy}
                  r="5"
                  fill={dot.color}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: dot.delay, duration: 0.4 }}
                />
              ))}
            </svg>
          </div>

          {/* Grid of Floating Stair Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 relative z-10">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              const isActive = index === activeStep;

              return (
                <div key={step.num} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative ${step.offsetClass}`}
                  >
                    {/* Slow Floating Motion Loop */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: index * 0.35,
                      }}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setActiveStep(index)}
                      className={`relative rounded-2xl p-5 bg-[#F4F9FD] border-2 transition-all duration-500 flex flex-col justify-between min-h-[220px] overflow-hidden cursor-pointer ${
                        isActive
                          ? "border-[#1C39BB] shadow-[0_10px_28px_rgba(28,57,187,0.22)] scale-[1.02]"
                          : "border-[#133C55]/20 shadow-sm hover:shadow-md"
                      }`}
                      style={{
                        borderTop: `5px solid ${step.color}`,
                      }}
                    >
                      {/* Moving Line Highlighting Card Border Serially */}
                      {isActive && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 2.2,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1C39BB] to-transparent shadow-[0_0_12px_#1C39BB] z-20 pointer-events-none"
                        />
                      )}

                      {/* Stair Step Header */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className="font-display font-black text-xl tracking-tight transition-colors duration-300"
                            style={{ color: isActive ? "#1C39BB" : step.color }}
                          >
                            {step.num}
                          </span>
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                              isActive
                                ? "border-[#1C39BB] bg-[#1C39BB] text-white shadow-xs"
                                : "border-[#133C55]/15 bg-white"
                            }`}
                          >
                            <IconComp
                              size={18}
                              style={{ color: isActive ? "white" : step.color }}
                              strokeWidth={2.3}
                            />
                          </div>
                        </div>

                        <span
                          className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-md mb-2 font-sans-secondary border transition-all duration-300"
                          style={{
                            color: step.color,
                            background: `${step.color}12`,
                            borderColor: `${step.color}30`,
                          }}
                        >
                          {step.tag}
                        </span>

                        <h3 className="font-display font-bold text-[#0f2442] text-sm sm:text-base leading-snug mb-1.5">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-[#133C55]/80 text-xs leading-relaxed font-sans-secondary font-medium mt-1">
                        {step.description}
                      </p>

                      {/* Stair Tread Base Accent */}
                      <div
                        className="w-full h-1 rounded-full mt-3 transition-all duration-300"
                        style={{
                          background: isActive
                            ? "linear-gradient(90deg, #1C39BB, #14b8a6)"
                            : step.color,
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Mobile & Tablet Vertical Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-1.5">
                      <div
                        className={`w-1 h-6 rounded-full transition-colors ${
                          isActive
                            ? "bg-[#1C39BB]"
                            : "bg-gradient-to-b from-[#1C39BB] to-[#14b8a6]"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
