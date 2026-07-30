import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    // TODO: wire to backend auth
    console.log("Login payload:", form);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #F4F9FD 0%, #e8f4fb 100%)" }}
    >
      {/* ── Left Panel — branding ── */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #133C55 0%, #386FA4 60%, #59A5D8 100%)" }}
      >
        {/* decorative blobs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20" style={{ background: "#91E5F6", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15" style={{ background: "#84D2F6", filter: "blur(80px)" }} />

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <MapPin size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-2xl font-bold text-white tracking-wide">
            Yatra<span className="text-[#91E5F6]">AI</span>
          </span>
        </Link>

        {/* Tagline */}
        <div>
          <h2 className="font-display font-black text-white leading-tight mb-4" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
            Your journey<br />starts here.
          </h2>
          <p className="text-white/75 text-lg leading-relaxed font-sans-dm max-w-sm">
            Discover the incredible diversity of India — from snow-capped Himalayas to golden beaches — all AI-planned, just for you.
          </p>
        </div>

        {/* Bottom quote */}
        <p className="text-white/40 text-xs font-sans-dm">
          © 2025 YatraAI · All rights reserved
        </p>
      </div>

      {/* ── Right Panel — form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #386FA4, #133C55)" }}>
              <MapPin size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display text-xl font-bold text-[#133C55]">
              Yatra<span className="text-[#386FA4]">AI</span>
            </span>
          </Link>

          <h1 className="font-display font-black text-[#133C55] text-3xl mb-2">Welcome back</h1>
          <p className="text-[#133C55]/60 text-sm font-sans-dm mb-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#386FA4] font-bold hover:underline">
              Sign up free
            </Link>
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-xs font-bold tracking-widest uppercase text-[#133C55]/70 font-sans-dm">
                Email address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#386FA4]" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-[#133C55] placeholder-[#133C55]/35 outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: "1.5px solid #d0e8f5",
                    boxShadow: "0 2px 8px rgba(56,111,164,0.06)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#386FA4")}
                  onBlur={(e) => (e.target.style.borderColor = "#d0e8f5")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="login-password" className="text-xs font-bold tracking-widest uppercase text-[#133C55]/70 font-sans-dm">
                  Password
                </label>
                <a href="#" className="text-xs text-[#386FA4] font-semibold hover:underline font-sans-dm">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#386FA4]" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl text-sm text-[#133C55] placeholder-[#133C55]/35 outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: "1.5px solid #d0e8f5",
                    boxShadow: "0 2px 8px rgba(56,111,164,0.06)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#386FA4")}
                  onBlur={(e) => (e.target.style.borderColor = "#d0e8f5")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#133C55]/50 hover:text-[#386FA4] transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              id="login-submit"
              type="submit"
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(56,111,164,0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-sm font-bold text-white tracking-wide mt-2"
              style={{
                background: "linear-gradient(135deg, #386FA4 0%, #133C55 100%)",
                boxShadow: "0 4px 20px rgba(56,111,164,0.25)",
              }}
            >
              Sign in to YatraAI
              <ArrowRight size={16} />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#133C55]/10" />
            <span className="text-xs text-[#133C55]/40 font-sans-dm">or continue with</span>
            <div className="flex-1 h-px bg-[#133C55]/10" />
          </div>

          {/* Social placeholder */}
          <button
            id="login-google"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-sm font-semibold text-[#133C55] transition-all hover:shadow-md"
            style={{ background: "#fff", border: "1.5px solid #d0e8f5" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
}
