import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo.png";
import AuthModal from "../ui/AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [authModal, setAuthModal] = useState(null); // null | "login" | "signup"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav
          className={`w-full max-w-6xl transition-all duration-500 rounded-full px-8 py-3 flex items-center justify-between gap-6 border ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-white/80 shadow-[0_8px_32px_rgba(13,50,77,0.15)]"
              : "bg-white/15 backdrop-blur-xl border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          }`}
        >

          {/* ── Brand / Logo ── */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={logoImg}
              alt="Tripzy"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* ── Auth Buttons ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Login Button */}
            <motion.button
              id="navbar-login"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAuthModal("login")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold text-[#133C55] bg-white/80 backdrop-blur-md border border-[#133C55]/20 hover:bg-[#133C55]/10 hover:border-[#133C55]/40 transition-all shadow-xs"
            >
              <LogIn size={15} strokeWidth={2.3} />
              Login
            </motion.button>

            {/* Sign Up Button */}
            <motion.button
              id="navbar-signup"
              whileHover={{ scale: 1.05, boxShadow: "0 6px 24px rgba(37,99,235,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAuthModal("signup")}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all shadow-md"
            >
              <UserPlus size={15} strokeWidth={2.3} />
              Sign Up
            </motion.button>
          </div>

        </nav>
      </motion.header>

      {/* ── Floating Auth Modal ── */}
      {authModal && (
        <AuthModal
          defaultTab={authModal}
          onClose={() => setAuthModal(null)}
        />
      )}
    </>
  );
}
