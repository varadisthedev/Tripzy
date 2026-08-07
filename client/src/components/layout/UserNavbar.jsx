import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutGrid, ShoppingBag, Calendar, User } from "lucide-react";
import logoImg from "../../assets/images/logo.png";

export default function UserNavbar() {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Catalog",
      path: "/catalog",
      icon: ShoppingBag,
    },
    {
      name: "My Bookings",
      path: "/bookings",
      icon: Calendar,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="bg-white/95 backdrop-blur-md rounded-full px-8 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-between w-full max-w-4xl transition-all duration-300"
      >
        {/* ── Brand / Logo Image ── */}
        <Link to="/dashboard" className="flex items-center gap-1 group flex-shrink-0">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logoImg}
            alt="Tripzy"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>


        {/* ── Navigation Links ── */}
        <div className="flex items-center gap-8 md:gap-12">
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
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className="transition-transform duration-200"
                  />
                  <span>{item.name}</span>
                </div>

                {/* ── Active Bottom Underline Indicator ── */}
                {isActive && (
                  <motion.div
                    layoutId="userNavUnderline"
                    className="absolute -bottom-3.5 left-0 right-0 h-[3px] bg-[#2563EB] rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
