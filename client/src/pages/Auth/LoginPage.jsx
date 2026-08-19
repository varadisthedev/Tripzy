import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Plane } from "lucide-react";
import authBg from "../../assets/images/auth-bg.png";
import logoImg from "../../assets/images/logo.png";
import { loginUser } from "../../lib/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await loginUser(form);
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setError(authError.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10"
      style={{ background: "#eef7fc" }}
    >
      {/* Main card */}
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white">
        {/* ══════════════════════════════════════════
            LEFT PANEL — Background image area
            ══════════════════════════════════════════ */}
        <div
          className="hidden lg:flex flex-[0_0_46%] relative overflow-hidden min-h-[540px]"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            backgroundPosition: "left center",
          }}
        >
          {/* Subtle gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#133C55]/30 via-transparent to-transparent" />

          {/* Heading overlay — positioned in the open area below top edge */}
          <div className="absolute top-12 left-0 right-0 px-5 z-10">
            <h1 className="font-display font-extrabold text-[#0f2442] text-4xl sm:text-[2.65rem] leading-[1.15] mb-3">
              Welcome
              <span className="text-[#2c497f]">Back!</span>
            </h1>
            <p className="text-[#000000] text-base sm:text-lg leading-relaxed max-w-[290px] font-sans-secondary font-bold italic">
              Continue your journey across India and explore your saved itineraries.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            RIGHT PANEL — White form area
            ══════════════════════════════════════════ */}
        <div className="flex-1 bg-white relative flex items-center justify-center px-6 sm:px-10 py-8 overflow-hidden">
          {/* Top-right logo in card right panel */}
          <div className="absolute top-6 right-6 z-20">
            <Link to="/">
              <img
                src={logoImg}
                alt="Tripzy"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Dot grid decoration */}
          <div className="absolute top-6 right-6 pointer-events-none opacity-0">
            <div
              className="grid gap-[7px]"
              style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
            >
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#14b8a6", opacity: 0.18 }}
                />
              ))}
            </div>
          </div>

          {/* Travel stamp watermark */}
          <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.12]">
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                r="33"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle
                cx="36"
                cy="36"
                r="27"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="1"
              />
              <text
                x="50%"
                y="36%"
                textAnchor="middle"
                fill="#14b8a6"
                fontSize="6.5"
                fontFamily="serif"
                fontWeight="bold"
                letterSpacing="1"
              >
                TIME TO TRAVEL
              </text>
              <text
                x="50%"
                y="54%"
                textAnchor="middle"
                fill="#14b8a6"
                fontSize="12"
                fontFamily="serif"
              >
                ✈
              </text>
              <text
                x="50%"
                y="70%"
                textAnchor="middle"
                fill="#14b8a6"
                fontSize="5.5"
                fontFamily="serif"
                letterSpacing="0.5"
              >
                EXPLORE INDIA
              </text>
            </svg>
          </div>

          {/* Form + Social side-by-side */}
          <div className="w-full max-w-md flex items-stretch gap-5">
            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col justify-center"
            >
              {/* Heading */}
              <h2 className="font-display font-black text-[#0f2442] text-3xl mb-1">
                Sign in
              </h2>
              <div
                className="w-10 h-1 rounded-full mb-6"
                style={{ background: "#14b8a6" }}
              />

              {/* Error */}
              {error && (
                <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="login-email"
                    className="text-xs font-semibold text-[#133C55]/75"
                  >
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                    />
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#133C55] placeholder-[#94a3b8] outline-none transition-all bg-white"
                      style={{ border: "1.5px solid #e2e8f0" }}
                      onFocus={(e) => (e.target.style.borderColor = "#14b8a6")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="text-xs font-semibold text-[#133C55]/75"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-xs font-semibold hover:underline"
                      style={{ color: "#14b8a6" }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                    />
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm text-[#133C55] placeholder-[#94a3b8] outline-none transition-all bg-white"
                      style={{ border: "1.5px solid #e2e8f0" }}
                      onFocus={(e) => (e.target.style.borderColor = "#14b8a6")}
                      onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#14b8a6] transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 8px 24px rgba(20,184,166,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between w-full py-3 px-5 rounded-xl text-sm font-bold text-white mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #0f2442 0%, #1f3ccbff 100%)",
                  }}
                >
                  <span>{loading ? "Signing in..." : "Sign in"}</span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  >
                    <Plane size={14} className="text-white" />
                  </div>
                </motion.button>
              </form>

              {/* Bottom link */}
              <p
                className="text-center text-xs mt-5"
                style={{ color: "#94a3b8" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold hover:underline"
                  style={{ color: "#14b8a6" }}
                >
                  Sign up here
                </Link>
              </p>
            </motion.div>

            {/* Social buttons column */}
            <div className="hidden lg:flex flex-col items-center gap-3 py-2 pl-2">
              <div
                className="flex-1 w-px"
                style={{ background: "#e2e8f0", minHeight: "35px" }}
              />
              <span
                className="text-xs font-bold tracking-widest"
                style={{ color: "#94a3b8" }}
              >
                OR
              </span>
              <div
                className="flex-1 w-px"
                style={{ background: "#e2e8f0", minHeight: "35px" }}
              />

              <motion.button
                whileHover={{ scale: 1.1, borderColor: "#14b8a6" }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors"
                style={{ border: "1.5px solid #e2e8f0" }}
                title="Sign in with GitHub"
                aria-label="Sign in with GitHub"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#181717">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, borderColor: "#14b8a6" }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors"
                style={{ border: "1.5px solid #e2e8f0" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#1DA1F2">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, borderColor: "#14b8a6" }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-colors"
                style={{ border: "1.5px solid #e2e8f0" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
