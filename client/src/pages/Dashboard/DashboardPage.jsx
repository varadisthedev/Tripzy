import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Compass, Luggage, Search, ArrowRight } from "lucide-react";
import UserNavbar from "../../components/layout/UserNavbar";
import { fetchCurrentUser, fetchBookings, fetchSearchHistory } from "../../lib/authApi";

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-6 flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#14b8a6]/10 text-[#0f766e]">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-black text-[#0f2442]">{value}</p>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    Promise.all([fetchCurrentUser(), fetchBookings(), fetchSearchHistory()])
      .then(([userData, bookingsData, searchData]) => {
        if (!isMounted) return;
        setUser(userData.user);
        setBookings(bookingsData.bookings || []);
        setSearches(searchData.history || []);
      })
      .catch((fetchError) => {
        if (isMounted) setError(fetchError.message || "Unable to load your dashboard.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const now = Date.now();
  const upcomingBookings = bookings
    .filter((booking) => booking.status !== "cancelled")
    .filter((booking) => !booking.startDate || new Date(booking.startDate).getTime() >= now)
    .sort((a, b) => new Date(a.startDate || 0) - new Date(b.startDate || 0))
    .slice(0, 3);

  const uniqueDestinations = new Set(
    bookings.filter((b) => b.destination).map((b) => b.destination.toLowerCase())
  ).size;

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 pb-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            {user ? `Welcome back, ${user.name.split(" ")[0]}` : "Your dashboard"}
          </h1>
          <p className="text-[#386FA4]">Here's what's happening with your trips.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
            <p className="text-sm text-slate-500">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-3 mb-8">
              <StatCard icon={Luggage} label="Total bookings" value={bookings.length} />
              <StatCard icon={Calendar} label="Upcoming trips" value={upcomingBookings.length} />
              <StatCard icon={Compass} label="Destinations booked" value={uniqueDestinations} />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <section className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-[#0f2442]">Upcoming trips</h2>
                  <Link
                    to="/bookings"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#14b8a6] hover:underline"
                  >
                    View all <ArrowRight size={14} />
                  </Link>
                </div>

                {upcomingBookings.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No upcoming trips yet.{" "}
                    <Link to="/catalog" className="text-[#14b8a6] font-semibold hover:underline">
                      Browse destinations
                    </Link>{" "}
                    to plan your next one.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="rounded-2xl bg-[#F7F9FC] p-4 border border-slate-100 flex items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-[#0f2442]">{booking.title}</p>
                          <p className="text-xs text-slate-500">
                            {booking.destination || "Destination TBD"}
                            {formatDate(booking.startDate) ? ` · ${formatDate(booking.startDate)}` : ""}
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700 capitalize">
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-3xl bg-[#0f2442] text-white shadow-[0_18px_50px_rgba(15,36,66,0.14)] p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Search size={18} />
                  <h2 className="text-xl font-black">Recent searches</h2>
                </div>

                {searches.length === 0 ? (
                  <p className="text-sm text-white/70">
                    Your recent searches on the Catalog page will show up here.
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {searches.slice(0, 5).map((entry) => (
                      <div
                        key={entry.id}
                        className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium"
                      >
                        {entry.query}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
