import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, User as UserIcon, ShieldCheck, LogOut, Loader2 } from "lucide-react";
import UserNavbar from "../../components/layout/UserNavbar";
import { fetchCurrentUser, logoutUser } from "../../lib/authApi";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
        const response = await fetchCurrentUser();
        if (isMounted) {
          setUser(response.user);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message || "Unable to load profile.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);

    try {
      await logoutUser();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">User Profile</h1>
            <p className="text-[#386FA4]">View your account details and sign out when you are done.</p>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(135deg, #0f2442 0%, #1f3ccb 100%)" }}
          >
            {signingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            {signingOut ? "Signing out..." : "Sign out"}
          </motion.button>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
            <p className="text-sm text-slate-500">Loading profile information...</p>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-red-50 border border-red-200 p-8 text-red-700">
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0f2442] text-white shadow-lg">
                  <UserIcon size={28} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-semibold">Signed in as</p>
                  <h2 className="text-2xl font-black text-[#0f2442]">{user?.name}</h2>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                    <Mail size={16} />
                    Email
                  </div>
                  <p className="text-base font-semibold text-[#133C55] break-all">{user?.email}</p>
                </div>

                <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                    <ShieldCheck size={16} />
                    Role
                  </div>
                  <p className="text-base font-semibold text-[#133C55] capitalize">{user?.role}</p>
                </div>
              </div>
            </section>

            <aside className="rounded-3xl bg-[#0f2442] text-white shadow-[0_18px_50px_rgba(15,36,66,0.14)] p-8">
              <p className="text-sm uppercase tracking-[0.25em] text-white/60 font-semibold mb-2">Session</p>
              <h3 className="text-2xl font-black mb-3">Dedicated sign out</h3>
              <p className="text-sm leading-relaxed text-white/80 mb-6">
                This clears the httpOnly auth cookies on the server and sends you back to the login screen.
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                disabled={signingOut}
                className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#0f2442] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {signingOut ? "Signing out..." : "Sign out now"}
              </motion.button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

