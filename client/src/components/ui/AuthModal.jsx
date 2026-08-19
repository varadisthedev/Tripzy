import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Eye, EyeOff, User, Plane } from "lucide-react";
import authBg from "../../assets/images/auth-bg.png";
import logoImg from "../../assets/images/logo.png";
import { loginUser, signupUser } from "../../lib/authApi";

export default function AuthModal({ defaultTab = "login", onClose }) {
  const [tab, setTab] = useState(defaultTab);
  const navigate = useNavigate();

  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup state
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [signupError, setSignupError] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please fill in all fields.");
      return;
    }
    setLoginLoading(true);
    setLoginError("");

    try {
      await loginUser(loginForm);
      onClose?.();
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setLoginError(authError.message || "Unable to sign in.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.repeat
    ) {
      setSignupError("Please fill in all fields.");
      return;
    }
    if (signupForm.password.length < 8) {
      setSignupError("Password must be at least 8 characters.");
      return;
    }
    if (signupForm.password !== signupForm.repeat) {
      setSignupError("Passwords do not match.");
      return;
    }
    setSignupLoading(true);
    setSignupError("");

    try {
      await signupUser({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
      });
      onClose?.();
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setSignupError(authError.message || "Unable to create account.");
    } finally {
      setSignupLoading(false);
    }
  };

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#133C55] placeholder-[#94a3b8] outline-none transition-all bg-white";
  const inputStyle = { border: "1.5px solid #e2e8f0" };
  const onFocus = (e) => (e.target.style.borderColor = "#14b8a6");
  const onBlur = (e) => (e.target.style.borderColor = "#e2e8f0");

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="auth-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        style={{ background: "rgba(5,13,26,0.6)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        {/* Modal Card — same design as the full pages */}
        <motion.div
          key="auth-modal"
          initial={{ opacity: 0, scale: 0.93, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 30 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row bg-white relative"
          style={{ maxHeight: "90vh", overflowY: "auto" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 shadow transition-all"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* ── LEFT PANEL — Background image ── */}
          <div
            className="hidden lg:flex flex-[0_0_44%] relative overflow-hidden min-h-[520px]"
            style={{
              backgroundImage: `url(${authBg})`,
              backgroundSize: "cover",
              backgroundPosition: "left center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#133C55]/30 via-transparent to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 left-0 right-0 px-6 z-10"
              >
                {tab === "login" ? (
                  <>
                    <h1 className="font-display font-extrabold text-[#0f2442] text-4xl sm:text-[2.6rem] leading-[1.15] mb-3">
                      Welcome <span className="text-[#2c497f]">Back!</span>
                    </h1>
                    <p className="text-[#000000] text-sm leading-relaxed max-w-[260px] font-sans-dm font-bold">
                      Continue your journey across India and explore your saved
                      itineraries.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="font-display font-extrabold text-[#0f2442] text-4xl sm:text-[2.6rem] leading-[1.15] mb-3">
                      Let's Get <span className="text-[#2c497f]">Started</span>
                    </h1>
                    <p className="text-[#000000] text-sm leading-relaxed max-w-[260px] font-sans-dm font-bold">
                      Discover incredible places across India and plan your
                      perfect journey with ease.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT PANEL — Form ── */}
          <div className="flex-1 bg-white relative flex items-center justify-center px-6 sm:px-10 py-8 overflow-hidden">
            {/* Logo */}
            <div className="absolute top-6 right-6 z-20">
              <img
                src={logoImg}
                alt="Tripzy"
                className="h-16 w-auto object-contain"
              />
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

            {/* Form + Social */}
            <div className="w-full max-w-md flex items-stretch gap-5 pt-10">
              <AnimatePresence mode="wait">
                {/* ── LOGIN FORM ── */}
                {tab === "login" && (
                  <motion.div
                    key="login-form"
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 18 }}
                    transition={{ duration: 0.28 }}
                    className="flex-1 flex flex-col justify-center"
                  >
                    <h2 className="font-display font-black text-[#0f2442] text-3xl mb-1">
                      Sign in
                    </h2>
                    <div
                      className="w-10 h-1 rounded-full mb-6"
                      style={{ background: "#14b8a6" }}
                    />

                    {loginError && (
                      <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
                        {loginError}
                      </div>
                    )}

                    <form
                      onSubmit={handleLogin}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="modal-login-email"
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
                            id="modal-login-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={loginForm.email}
                            onChange={(e) =>
                              setLoginForm({
                                ...loginForm,
                                email: e.target.value,
                              })
                            }
                            className={inputClass}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="modal-login-password"
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
                            id="modal-login-password"
                            type={showLoginPw ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) =>
                              setLoginForm({
                                ...loginForm,
                                password: e.target.value,
                              })
                            }
                            className={`${inputClass} pr-11`}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPw(!showLoginPw)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#14b8a6] transition-colors"
                          >
                            {showLoginPw ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loginLoading}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 24px rgba(20,184,166,0.35)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between w-full py-3 px-5 rounded-xl text-sm font-bold text-white mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(135deg, #0f2442 0%, #1f3ccb 100%)",
                        }}
                      >
                        <span>
                          {loginLoading ? "Signing in..." : "Sign in"}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.2)" }}
                        >
                          <Plane size={14} className="text-white" />
                        </div>
                      </motion.button>
                    </form>

                    <p
                      className="text-center text-xs mt-5"
                      style={{ color: "#94a3b8" }}
                    >
                      Don't have an account?{" "}
                      <button
                        onClick={() => setTab("signup")}
                        className="font-bold hover:underline"
                        style={{ color: "#14b8a6" }}
                      >
                        Sign up here
                      </button>
                    </p>
                  </motion.div>
                )}

                {/* ── SIGNUP FORM ── */}
                {tab === "signup" && (
                  <motion.div
                    key="signup-form"
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.28 }}
                    className="flex-1"
                  >
                    <h2 className="font-display font-black text-[#0f2442] text-3xl mb-1">
                      Sign up
                    </h2>
                    <div
                      className="w-10 h-1 rounded-full mb-6"
                      style={{ background: "#14b8a6" }}
                    />

                    {signupError && (
                      <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
                        {signupError}
                      </div>
                    )}

                    <form
                      onSubmit={handleSignup}
                      className="flex flex-col gap-3.5"
                    >
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="modal-signup-name"
                          className="text-xs font-semibold text-[#133C55]/75"
                        >
                          Your name
                        </label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                          />
                          <input
                            id="modal-signup-name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your name"
                            value={signupForm.name}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                name: e.target.value,
                              })
                            }
                            className={inputClass}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="modal-signup-email"
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
                            id="modal-signup-email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={signupForm.email}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                email: e.target.value,
                              })
                            }
                            className={inputClass}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="modal-signup-password"
                          className="text-xs font-semibold text-[#133C55]/75"
                        >
                          Create Password
                        </label>
                        <div className="relative">
                          <Lock
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                          />
                          <input
                            id="modal-signup-password"
                            type={showSignupPw ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={signupForm.password}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                password: e.target.value,
                              })
                            }
                            className={`${inputClass} pr-11`}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSignupPw(!showSignupPw)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#14b8a6] transition-colors"
                          >
                            {showSignupPw ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="modal-signup-repeat"
                          className="text-xs font-semibold text-[#133C55]/75"
                        >
                          Repeat password
                        </label>
                        <div className="relative">
                          <Lock
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]"
                          />
                          <input
                            id="modal-signup-repeat"
                            type={showRepeat ? "text" : "password"}
                            autoComplete="new-password"
                            placeholder="Repeat your password"
                            value={signupForm.repeat}
                            onChange={(e) =>
                              setSignupForm({
                                ...signupForm,
                                repeat: e.target.value,
                              })
                            }
                            className={`${inputClass} pr-11`}
                            style={inputStyle}
                            onFocus={onFocus}
                            onBlur={onBlur}
                          />
                          <button
                            type="button"
                            onClick={() => setShowRepeat(!showRepeat)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#14b8a6] transition-colors"
                          >
                            {showRepeat ? (
                              <EyeOff size={15} />
                            ) : (
                              <Eye size={15} />
                            )}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={signupLoading}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 8px 24px rgba(20,184,166,0.35)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-between w-full py-3 px-5 rounded-xl text-sm font-bold text-white mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(135deg, #0f2442 0%, #1f3ccb 100%)",
                        }}
                      >
                        <span>
                          {signupLoading ? "Creating account..." : "Sign up"}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.2)" }}
                        >
                          <Plane size={14} className="text-white" />
                        </div>
                      </motion.button>
                    </form>

                    <p
                      className="text-center text-xs mt-4"
                      style={{ color: "#94a3b8" }}
                    >
                      Already a Member?{" "}
                      <button
                        onClick={() => setTab("login")}
                        className="font-bold hover:underline"
                        style={{ color: "#14b8a6" }}
                      >
                        Sign in here
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social column */}
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
                {[
                  {
                    fill: "#1877F2",
                    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                    size: 17,
                  },
                ].map((s, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.1, borderColor: "#14b8a6" }}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
                    style={{ border: "1.5px solid #e2e8f0" }}
                  >
                    <svg
                      width={s.size}
                      height={s.size}
                      viewBox="0 0 24 24"
                      fill={s.fill}
                    >
                      <path d={s.d} />
                    </svg>
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1, borderColor: "#14b8a6" }}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
