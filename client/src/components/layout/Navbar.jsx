import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, LogIn, UserPlus } from "lucide-react";

import logoImg from "../../assets/images/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-light py-3 shadow-md" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logoImg}
            alt="Tripzy"
            className="h-18 w-auto object-contain"
          />
        </Link>

        {/* ── Auth buttons ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Login */}
          <Link to="/login">
            <motion.button
              id="navbar-login"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all border ${scrolled
                  ? "text-[#133C55] border-[#133C55]/25 hover:bg-[#133C55]/8"
                  : "text-white border-white/30 hover:bg-white/10"
                }`}
            >
              <LogIn size={14} strokeWidth={2.5} />
              Login
            </motion.button>
          </Link>

          {/* Sign Up */}
          <Link to="/signup">
            <motion.button
              id="navbar-signup"
              whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(56,111,164,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #386FA4, #133C55)",
                boxShadow: "0 3px 14px rgba(56,111,164,0.35)",
              }}
            >
              <UserPlus size={14} strokeWidth={2.5} />
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
