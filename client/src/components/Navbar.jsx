import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "#explore-section" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-light py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            {/* <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #386FA4, #133C55)",
              }}
            >
              <MapPin size={16} className="text-white" strokeWidth={2.5} />
            </div> */}
            <span
              className={`font-display text-xl font-bold tracking-wide transition-colors ${scrolled ? "text-[#133C55]" : "text-white"}`}
            >
              Tripzy
            </span>
          </motion.div>
        </Link>

        {/* ── Desktop nav links ── */}
        <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-200 tracking-wide ${
                scrolled
                  ? "text-[#133C55]/75 hover:text-[#133C55]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Desktop auth buttons ── */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {/* Login */}
          <Link to="/login">
            <motion.button
              id="navbar-login"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                scrolled
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0 6px 24px rgba(56,111,164,0.4)",
              }}
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

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-0.5 rounded-full transition-all ${
                scrolled ? "bg-[#133C55]" : "bg-white"
              }`}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-light border-t border-[#84D2F6]/30 px-6 pb-5"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-[#133C55] hover:text-[#386FA4] text-sm font-semibold border-b border-[#84D2F6]/20"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-3 mt-4">
              <Link
                to="/login"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <button className="w-full py-3 rounded-full text-sm font-bold text-[#133C55] border border-[#133C55]/25">
                  Login
                </button>
              </Link>
              <Link
                to="/signup"
                className="flex-1"
                onClick={() => setMenuOpen(false)}
              >
                <button
                  className="w-full py-3 rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #386FA4, #133C55)",
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
