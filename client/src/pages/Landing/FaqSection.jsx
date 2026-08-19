import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "What is Tripzy?",
      a: "Tripzy is an intelligent travel planning platform that combines destination discovery, travel insights and personalized itinerary generation.",
    },
    {
      q: "Does Tripzy book my tickets?",
      a: "No. Tripzy helps you explore travel options and redirects you to the respective official booking platform to complete your booking.",
    },
    {
      q: "Are the predicted prices exact?",
      a: "No. Predicted prices are ML-based estimates generated from historical travel data and may differ from actual fares.",
    },
    {
      q: "Can I customize my itinerary?",
      a: "Yes. You choose the places you want to visit, and Tripzy generates an itinerary around your selections, dates and trip duration.",
    },
    {
      q: "Can I save my trips?",
      a: "Yes. Your generated itineraries can be saved to your profile and exported for later use.",
    },
  ];

  const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    <section
      id="faq"
      className="relative py-24 px-6 overflow-hidden bg-[#F4F9FD]"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider text-[#386FA4] bg-[#386FA4]/10 uppercase mb-4 font-sans-secondary">
            FAQ
          </span>
          <h2 className="font-display font-extrabold text-[#0f2442] text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Questions, answered.
          </h2>
        </motion.div>

        {/* Minimal Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="rounded-2xl border border-[#386FA4]/15 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-slate-50/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-[#0f2442] text-base sm:text-lg pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 flex-shrink-0 text-[#133C55]"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-[#133C55]/80 text-sm sm:text-base leading-relaxed font-sans-secondary font-medium border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
