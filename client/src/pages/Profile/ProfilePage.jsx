import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
<<<<<<< HEAD
import {
  Mail,
  User as UserIcon,
  ShieldCheck,
  LogOut,
  Loader2,
  Phone,
  MapPin,
  Wallet,
  Heart,
  Plus,
  X,
  Save,
} from "lucide-react";
import UserNavbar from "../../components/layout/UserNavbar";
import {
  fetchCurrentUser,
  fetchUserProfile,
  updateUserProfile,
  logoutUser,
} from "../../lib/authApi";

const SUGGESTED_INTERESTS = [
  "beaches",
  "trekking",
  "wildlife",
  "heritage",
  "adventure",
  "food",
  "nightlife",
  "backpacking",
  "luxury",
  "family",
];

const TRAVEL_STYLES = ["budget", "mid-range", "luxury", "backpacker", "family", "solo"];

const CURRENCIES = ["INR", "USD", "EUR", "GBP"];

const emptyForm = {
  username: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  bio: "",
  homeCity: "",
  homeCountry: "",
  travelInterests: [],
  preferredTravelStyle: "",
  budgetMin: "",
  budgetMax: "",
  budgetCurrency: "INR",
  preferredLanguage: "",
  marketingOptIn: false,
};

function inputClass() {
  return "w-full px-4 py-2.5 rounded-xl text-sm text-[#133C55] placeholder-[#94a3b8] outline-none transition-all bg-white border border-slate-200 focus:border-[#14b8a6]";
}
=======
import { Mail, User as UserIcon, ShieldCheck, LogOut, Loader2 } from "lucide-react";
import UserNavbar from "../../components/layout/UserNavbar";
import { fetchCurrentUser, logoutUser } from "../../lib/authApi";
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

<<<<<<< HEAD
  const [form, setForm] = useState(emptyForm);
  const [interestInput, setInterestInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState("");

=======
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      try {
<<<<<<< HEAD
        const [meResponse, profileResponse] = await Promise.all([
          fetchCurrentUser(),
          fetchUserProfile(),
        ]);

        if (!isMounted) return;

        setUser(meResponse.user);

        const profile = profileResponse.profile;
        if (profile) {
          setForm({
            username: profile.username || "",
            phoneNumber: profile.phoneNumber || "",
            dateOfBirth: profile.dateOfBirth || "",
            gender: profile.gender || "",
            bio: profile.bio || "",
            homeCity: profile.homeCity || "",
            homeCountry: profile.homeCountry || "",
            travelInterests: profile.travelInterests || [],
            preferredTravelStyle: profile.preferredTravelStyle || "",
            budgetMin: profile.budgetMin ?? "",
            budgetMax: profile.budgetMax ?? "",
            budgetCurrency: profile.budgetCurrency || "INR",
            preferredLanguage: profile.preferredLanguage || "",
            marketingOptIn: Boolean(profile.marketingOptIn),
          });
=======
        const response = await fetchCurrentUser();
        if (isMounted) {
          setUser(response.user);
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
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
<<<<<<< HEAD
=======

>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
    try {
      await logoutUser();
    } finally {
      navigate("/login", { replace: true });
    }
  };

<<<<<<< HEAD
  const addInterest = (value) => {
    const cleaned = value.trim().toLowerCase();
    if (!cleaned || form.travelInterests.includes(cleaned)) return;
    setForm({ ...form, travelInterests: [...form.travelInterests, cleaned] });
    setInterestInput("");
  };

  const removeInterest = (value) => {
    setForm({
      ...form,
      travelInterests: form.travelInterests.filter((i) => i !== value),
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    setSaveError("");

    const payload = {
      username: form.username || undefined,
      phoneNumber: form.phoneNumber || undefined,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender || undefined,
      bio: form.bio || undefined,
      homeCity: form.homeCity || undefined,
      homeCountry: form.homeCountry || undefined,
      travelInterests: form.travelInterests,
      preferredTravelStyle: form.preferredTravelStyle || undefined,
      budgetMin: form.budgetMin === "" ? undefined : Number(form.budgetMin),
      budgetMax: form.budgetMax === "" ? undefined : Number(form.budgetMax),
      budgetCurrency: form.budgetCurrency || undefined,
      preferredLanguage: form.preferredLanguage || undefined,
      marketingOptIn: form.marketingOptIn,
    };

    try {
      await updateUserProfile(payload);
      setSaveMessage("Profile saved successfully.");
    } catch (updateError) {
      setSaveError(updateError.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">User Profile</h1>
            <p className="text-[#386FA4]">
              View your account details and complete your travel profile.
            </p>
=======
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#133C55]">
      <UserNavbar />
      <main className="pt-28 px-6 pb-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">User Profile</h1>
            <p className="text-[#386FA4]">View your account details and sign out when you are done.</p>
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
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
<<<<<<< HEAD
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            {/* ── Left column: account summary + session ── */}
            <div className="flex flex-col gap-6">
              <section className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0f2442] text-white shadow-lg">
                    <UserIcon size={28} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-semibold">
                      Signed in as
                    </p>
                    <h2 className="text-2xl font-black text-[#0f2442]">{user?.name}</h2>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-slate-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                      <Mail size={16} />
                      Email
                    </div>
                    <p className="text-base font-semibold text-[#133C55] break-all">
                      {user?.email}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F7F9FC] p-5 border border-slate-100">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 mb-2">
                      <ShieldCheck size={16} />
                      Role
                    </div>
                    <p className="text-base font-semibold text-[#133C55] capitalize">
                      {user?.role}
                    </p>
                  </div>
                </div>
              </section>

              <aside className="rounded-3xl bg-[#0f2442] text-white shadow-[0_18px_50px_rgba(15,36,66,0.14)] p-8">
                <p className="text-sm uppercase tracking-[0.25em] text-white/60 font-semibold mb-2">
                  Session
                </p>
                <h3 className="text-2xl font-black mb-3">Dedicated sign out</h3>
                <p className="text-sm leading-relaxed text-white/80 mb-6">
                  This clears the httpOnly auth cookies on the server and sends you back to the
                  login screen.
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

            {/* ── Right column: editable travel profile ── */}
            <section className="rounded-3xl bg-white shadow-[0_18px_50px_rgba(15,36,66,0.08)] border border-slate-100 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-[#0f2442] mb-1">Travel profile</h2>
                <p className="text-sm text-slate-500">
                  Every field here is optional — fill in what you'd like, leave the rest blank.
                </p>
              </div>

              {saveMessage && (
                <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-emerald-700 bg-emerald-50 border border-emerald-200">
                  {saveMessage}
                </div>
              )}
              {saveError && (
                <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
                  {saveError}
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
                {/* Username / Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75 flex items-center gap-1.5">
                      <UserIcon size={13} /> Username
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. wanderlust_raj"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75 flex items-center gap-1.5">
                      <Phone size={13} /> Phone number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phoneNumber}
                      onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                </div>

                {/* DOB / Gender */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75">Gender</label>
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className={inputClass()}
                    >
                      <option value="">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                {/* Home city / country */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75 flex items-center gap-1.5">
                      <MapPin size={13} /> Home city
                    </label>
                    <input
                      type="text"
                      placeholder="Pune"
                      value={form.homeCity}
                      onChange={(e) => setForm({ ...form, homeCity: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#133C55]/75">Home country</label>
                    <input
                      type="text"
                      placeholder="India"
                      value={form.homeCountry}
                      onChange={(e) => setForm({ ...form, homeCountry: e.target.value })}
                      className={inputClass()}
                    />
                  </div>
                </div>

                {/* Travel interests */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#133C55]/75 flex items-center gap-1.5">
                    <Heart size={13} /> Travel interests
                  </label>

                  <div className="flex flex-wrap gap-2 mb-1">
                    {form.travelInterests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#14b8a6]/10 text-[#0f766e] border border-[#14b8a6]/30"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="hover:text-red-600"
                          aria-label={`Remove ${interest}`}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an interest and press Enter"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addInterest(interestInput);
                        }
                      }}
                      className={inputClass()}
                    />
                    <button
                      type="button"
                      onClick={() => addInterest(interestInput)}
                      className="px-3 rounded-xl bg-[#F7F9FC] border border-slate-200 text-[#0f2442] hover:border-[#14b8a6] transition-colors"
                      aria-label="Add interest"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {SUGGESTED_INTERESTS.filter((i) => !form.travelInterests.includes(i)).map(
                      (interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => addInterest(interest)}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-500 hover:border-[#14b8a6] hover:text-[#0f766e] transition-colors"
                        >
                          + {interest}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Travel style */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#133C55]/75">
                    Preferred travel style
                  </label>
                  <select
                    value={form.preferredTravelStyle}
                    onChange={(e) => setForm({ ...form, preferredTravelStyle: e.target.value })}
                    className={inputClass()}
                  >
                    <option value="">Not specified</option>
                    {TRAVEL_STYLES.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#133C55]/75 flex items-center gap-1.5">
                    <Wallet size={13} /> Travel budget
                  </label>
                  <div className="grid gap-3 grid-cols-3">
                    <input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={form.budgetMin}
                      onChange={(e) => setForm({ ...form, budgetMin: e.target.value })}
                      className={inputClass()}
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={form.budgetMax}
                      onChange={(e) => setForm({ ...form, budgetMax: e.target.value })}
                      className={inputClass()}
                    />
                    <select
                      value={form.budgetCurrency}
                      onChange={(e) => setForm({ ...form, budgetCurrency: e.target.value })}
                      className={inputClass()}
                    >
                      {CURRENCIES.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bio */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#133C55]/75">Bio</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us a little about your travel style..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className={inputClass()}
                  />
                </div>

                {/* Marketing opt-in */}
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.marketingOptIn}
                    onChange={(e) => setForm({ ...form, marketingOptIn: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  Send me travel deals and recommendations by email
                </label>

                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto self-start px-6 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #0f2442 0%, #1f3ccb 100%)" }}
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? "Saving..." : "Save profile"}
                </motion.button>
              </form>
            </section>
=======
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
>>>>>>> ee5df9a4864993e52cb5fba829cddd1c386b14a6
          </div>
        )}
      </main>
    </div>
  );
}
