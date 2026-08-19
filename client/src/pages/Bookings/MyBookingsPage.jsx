import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Loader2, X, Ticket } from "lucide-react";
import UserNavbar from "../../components/layout/UserNavbar";
import { fetchBookings, deleteBooking } from "../../lib/authApi";

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-slate-100 text-slate-500 border-slate-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

function formatDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchBookings()
      .then((data) => {
        if (isMounted) setBookings(data.bookings || []);
      })
      .catch((fetchError) => {
        if (isMounted) setError(fetchError.message || "Unable to load bookings.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCancel = async (id) => {
    setCancellingId(id);
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (cancelError) {
      setError(cancelError.message || "Unable to cancel booking.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 pb-16 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">My Bookings</h1>
          <p className="text-[#386FA4]">Everything you've booked, in one place.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
            <p className="text-sm text-slate-500">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-12 text-center">
            <Ticket size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-base font-semibold text-[#0f2442] mb-1">No bookings yet</p>
            <p className="text-sm text-slate-500">
              Once you book a trip, it'll show up here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => {
              const startDate = formatDate(booking.startDate);
              const endDate = formatDate(booking.endDate);
              const statusClass = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h2 className="text-lg font-bold text-[#0f2442]">{booking.title}</h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusClass}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                      {booking.destination && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {booking.origin ? `${booking.origin} → ${booking.destination}` : booking.destination}
                        </span>
                      )}
                      {(startDate || endDate) && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {startDate}
                          {endDate ? ` – ${endDate}` : ""}
                        </span>
                      )}
                      {booking.guests && (
                        <span className="flex items-center gap-1.5">
                          <Users size={14} />
                          {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {booking.totalAmount && (
                      <p className="text-base font-bold text-[#0f2442]">
                        {booking.currency || "INR"} {booking.totalAmount}
                      </p>
                    )}
                    {booking.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingId === booking.id}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {cancellingId === booking.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <X size={14} />
                        )}
                        Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
