import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";

export default function Footer({ onOpenAuth }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t py-14 px-6 overflow-hidden bg-[#0f2442] text-white border-white/10">
      {/* Background subtle glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 opacity-15 pointer-events-none"
        style={{ background: "#59A5D8", filter: "blur(80px)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block mb-3">
              <img src={logoImg} alt="Tripzy" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-white/70 text-sm font-sans-secondary font-medium">
              Plan smarter. Explore more.
            </p>
          </div>

          {/* Nav & Account Links */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {/* Navigation */}
            <div>
              <h4 className="text-[#91E5F6] font-bold text-xs uppercase tracking-wider mb-3.5 font-sans-secondary">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-white/75 font-sans-secondary font-medium">
                <li>
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-[#91E5F6] font-bold text-xs uppercase tracking-wider mb-3.5 font-sans-secondary">
                Account
              </h4>
              <ul className="space-y-2 text-sm text-white/75 font-sans-secondary font-medium">
                <li>
                  <button
                    onClick={() => onOpenAuth?.("login")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAuth?.("signup")}
                    className="hover:text-[#91E5F6] transition-colors"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-white/50 font-sans-secondary font-medium">
          <p>© 2026 Tripzy. All rights reserved.</p>
          <p>Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
