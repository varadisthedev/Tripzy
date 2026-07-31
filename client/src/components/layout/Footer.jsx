import { motion } from "framer-motion";
import { Globe, Rss, Share } from "lucide-react";


export default function Footer() {
  const links = {
    Explore: ["Kashmir", "Rajasthan", "Kerala", "Goa", "Ladakh", "Meghalaya"],
    Company: ["About Us", "How It Works", "Blog", "Press Kit"],
    Support: ["Help Center", "Privacy Policy", "Terms of Service", "Contact"],
  };

  return (
    <footer
      className="relative border-t py-16 px-6 overflow-hidden bg-[#344966] text-white"
      style={{
        borderColor: "rgba(145,229,246,0.2)",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 opacity-15"
        style={{ background: "#59A5D8", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
         
            <p className="text-[#f4f4f8]/80 text-sm leading-relaxed max-w-xs mb-6 font-sans-dm font-medium">
              India's most intelligent travel planning platform. Discover,
              plan, and travel across India 
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Share, Rss].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.15, color: "#91E5F6" }}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-[#91E5F6] transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-[#91E5F6] font-bold text-sm mb-4 tracking-wide">{group}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 hover:text-[#91E5F6] text-sm transition-colors font-sans-dm font-medium"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div 
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(145,229,246,0.15)" }}
        >
          <p className="text-[#f4f4f8]/60 text-xs font-sans-dm font-medium">
            © 2026 Tripzy. All rights reserved.
          </p>
          <p className="text-[#f4f4f8]/60 text-xs font-sans-dm font-medium">
            Made in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
