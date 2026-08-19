import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ShoppingBag, Calendar, Crown, Bell, ChevronDown, User, LogOut } from "lucide-react";
import logoImg from "../../assets/images/logo.png";
import { fetchCurrentUser, logoutUser } from "../../lib/authApi";

export default function UserNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { name: "Catalog", path: "/catalog", icon: ShoppingBag },
    { name: "My Bookings", path: "/bookings", icon: Calendar },
  ];

  useEffect(() => {
    let isMounted = true;
    fetchCurrentUser()
      .then((res) => {
        if (isMounted) setUser(res.user || null);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await logoutUser();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="bg-white rounded-[28px] px-4 sm:px-6 py-2.5 shadow-[0_10px_40px_rgba(19,60,85,0.10)] border border-slate-100 flex items-center justify-between gap-4 w-full max-w-6xl transition-all duration-300">
        {/* ── Brand / Logo ── */}
        <Link to="/dashboard" className="flex items-center gap-1 group flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logoImg}
            alt="Tripzy"
            className="h-9 md:h-11 w-auto object-contain"
          />
        </Link>

        {/* ── Navigation Links ── */}
        <div className="hidden md:flex items-center gap-7 lg:gap-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative py-1 flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              >
                <div
                  className={`flex items-center gap-2 transition-colors ${
                    isActive ? "text-[#2563EB]" : "text-slate-700 hover:text-[#2563EB]"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.3 : 1.8} />
                  <span>{item.name}</span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="userNavUnderline"
                    className="absolute -bottom-3.5 left-0 right-0 h-[3px] bg-[#2563EB] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* ── Right-side account area ── */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Premium affordance (decorative) */}
          <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full">
            <Crown size={13} strokeWidth={2.3} />
            <span>Premium</span>
          </div>

          {/* Notifications (decorative) */}
          <button
            type="button"
            aria-label="Notifications"
            className="hidden sm:relative sm:flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
          </button>

          {/* Account dropdown */}
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((p) => !p)}
              className="flex items-center gap-2 pl-1 pr-2 sm:pr-3 py-1 rounded-full hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF1FF] text-[#1C3F94] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {initials || <User size={14} />}
              </div>
              <span className="hidden md:block text-sm font-semibold text-[#133C55] max-w-[110px] truncate">
                {user?.name || "Account"}
              </span>
              <ChevronDown size={14} className="hidden md:block text-slate-400" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-slate-100 md:hidden">
                    <p className="text-sm font-bold text-[#133C55] truncate">{user?.name || "Account"}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#2563EB] transition-colors"
                  >
                    <User size={15} />
                    Profile
                  </Link>
                  {/* Mobile nav links */}
                  <div className="md:hidden border-t border-slate-100 mt-1 pt-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                          location.pathname === item.path
                            ? "text-[#2563EB]"
                            : "text-slate-700 hover:bg-slate-50 hover:text-[#2563EB]"
                        }`}
                      >
                        <item.icon size={15} />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-slate-100 mt-1 disabled:opacity-60"
                  >
                    <LogOut size={15} />
                    {signingOut ? "Signing out..." : "Sign out"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  );
}
