import { motion } from "framer-motion";
import {
  Tag,
  TrendingUp,
  MapPin,
  Sparkles,
  Sun,
  Bookmark,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      id: "prices",
      title: "Smart Travel Prices",
      description: "Compare flight, train and bus options in one place.",
      icon: Tag,
      badge: "Multi-modal",
      gridClass: "col-span-1 md:col-span-2 lg:col-span-2",
      bgGradient: "from-sky-50/90 via-white to-blue-50/50",
      accentColor: "#1C39BB",
    },
    {
      id: "prediction",
      title: "Price Prediction",
      description: "Get ML-powered airfare estimates based on historical travel patterns.",
      icon: TrendingUp,
      badge: "ML Powered",
      gridClass: "col-span-1 md:col-span-1 lg:col-span-1",
      bgGradient: "from-blue-50/80 via-white to-indigo-50/40",
      accentColor: "#1C39BB",
    },
    {
      id: "discover",
      title: "Discover Places",
      description: "Explore popular attractions and experiences at your destination.",
      icon: MapPin,
      badge: "Curated",
      gridClass: "col-span-1 md:col-span-1 lg:col-span-1",
      bgGradient: "from-cyan-50/80 via-white to-teal-50/40",
      accentColor: "#1C39BB",
    },
    {
      id: "itinerary",
      title: "AI Itinerary",
      description: "Turn the places you choose into a personalized travel plan.",
      icon: Sparkles,
      badge: "Smart Generator",
      gridClass: "col-span-1 md:col-span-2 lg:col-span-2",
      bgGradient: "from-sky-50/90 via-white to-indigo-50/50",
      accentColor: "#1C39BB",
    },
    {
      id: "weather",
      title: "Weather Insights",
      description: "Know what conditions to expect during your journey.",
      icon: Sun,
      badge: "Live Forecast",
      gridClass: "col-span-1 md:col-span-1 lg:col-span-1",
      bgGradient: "from-blue-50/70 via-white to-sky-50/40",
      accentColor: "#1C39BB",
    },
    {
      id: "saved",
      title: "Saved Trips",
      description: "Save, download and revisit your travel plans whenever you need them.",
      icon: Bookmark,
      badge: "Offline Ready",
      gridClass: "col-span-1 md:col-span-2 lg:col-span-2",
      bgGradient: "from-slate-50 via-white to-blue-50/60",
      accentColor: "#1C39BB",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 px-6 overflow-hidden bg-[#F4F9FD]"
    >
      {/* Both IDs anchored for smooth scrolling from Hero */}
      <div id="explore-section" className="absolute -top-12 left-0" />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: "#1C39BB", filter: "blur(130px)" }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: "#386FA4", filter: "blur(130px)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3.5 py-1 rounded-md text-xs font-extrabold tracking-wider text-[#1C39BB] bg-[#1C39BB]/10 uppercase mb-4 font-sans-secondary border border-[#1C39BB]/30">
            Core Features
          </span>
          <h2 className="font-display font-extrabold text-[#0f2442] text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Everything you need for the journey ahead.
          </h2>
          <p className="text-[#133C55]/75 text-base sm:text-lg leading-relaxed font-sans-secondary font-medium">
            From discovering places to understanding travel prices and building your itinerary, Tripzy brings the essentials together.
          </p>
        </motion.div>

        {/* Bento Grid with Edgy 4pt Persian Blue Border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(28, 57, 187, 0.14)",
                }}
                className={`relative rounded-xl p-7 flex flex-col justify-between bg-gradient-to-br ${feature.bgGradient} transition-all shadow-sm ${feature.gridClass}`}
                style={{
                  borderWidth: "4px",
                  borderColor: "#1C39BB",
                  borderStyle: "solid",
                }}
              >
                {/* Top Row: Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shadow-xs"
                    style={{
                      background: "white",
                      border: "2px solid #1C39BB",
                    }}
                  >
                    <IconComponent
                      size={22}
                      style={{ color: "#1C39BB" }}
                      strokeWidth={2.4}
                    />
                  </div>
                  <span
                    className="text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-md uppercase font-sans-secondary border border-[#1C39BB]/30"
                    style={{
                      color: "#1C39BB",
                      background: "rgba(28, 57, 187, 0.08)",
                    }}
                  >
                    {feature.badge}
                  </span>
                </div>

                {/* Bottom Row: Text Content */}
                <div>
                  <h3 className="font-display font-bold text-[#0f2442] text-xl sm:text-2xl mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#133C55]/80 text-sm sm:text-base leading-relaxed font-sans-secondary font-medium max-w-xl">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
