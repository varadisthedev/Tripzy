import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  IndianRupee,
  SlidersHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  RotateCcw,
  Wallet,
  Building,
  Gem,
  Crown,
  Plane,
  Train,
  Bus,
  Car,
  User,
  Heart,
  Users,
  UserCheck,
  Trees,
  Mountain,
  Palmtree,
  Flower2,
  ShoppingBag,
  Utensils,
  PawPrint,
  Landmark,
  Accessibility,
  ChevronDown
} from "lucide-react";

// ── Persian Blue Color Token ──
const PERSIAN_BLUE = "#1C3F94";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/* ── Calendar Picker Dropdown ── */
function CalendarPicker({ startDate, endDate, onSelect, onClose }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(startDate ? startDate.getFullYear() : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(startDate ? startDate.getMonth() : today.getMonth());
  const [hovered, setHovered] = useState(null);
  const [selecting, setSelecting] = useState(startDate && endDate ? "start" : startDate ? "end" : "start");

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const firstDay = (y, m) => new Date(y, m, 1).getDay();

  const handleDayClick = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    if (selecting === "start") {
      onSelect(d, null);
      setSelecting("end");
    } else {
      if (startDate && d < startDate) {
        onSelect(d, null);
        setSelecting("end");
      } else {
        onSelect(startDate, d);
        setSelecting("start");
        onClose();
      }
    }
  };

  const inRange = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    const end = hovered || endDate;
    if (!startDate || !end) return false;
    const lo = startDate < end ? startDate : end;
    const hi = startDate < end ? end : startDate;
    return d > lo && d < hi;
  };

  const isStart = (day) => {
    if (!startDate) return false;
    return new Date(viewYear, viewMonth, day).toDateString() === startDate.toDateString();
  };
  const isEnd = (day) => {
    if (!endDate) return false;
    return new Date(viewYear, viewMonth, day).toDateString() === endDate.toDateString();
  };
  const isToday = (day) => {
    return new Date(viewYear, viewMonth, day).toDateString() === today.toDateString();
  };

  const total = daysInMonth(viewYear, viewMonth);
  const offset = firstDay(viewYear, viewMonth);
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);

  return (
    <div className="bg-white shadow-2xl border-2 p-3 w-[260px] rounded-lg" style={{ borderColor: PERSIAN_BLUE }}>
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="font-bold text-xs text-gray-800">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-0.5 hover:bg-gray-100 rounded transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 py-0.5">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const start = isStart(day);
          const end = isEnd(day);
          const range = inRange(day);
          return (
            <button
              key={day}
              onMouseEnter={() => setHovered(new Date(viewYear, viewMonth, day))}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleDayClick(day)}
              className={`
                relative h-7 w-full text-[11px] font-semibold transition-all flex items-center justify-center
                ${start || end ? "text-white z-10" : "text-gray-700 hover:text-white"}
                ${range ? "bg-blue-50" : ""}
              `}
            >
              {range && <span className="absolute inset-0 bg-blue-100" />}
              <span
                className={`
                  relative z-10 flex items-center justify-center h-6 w-6 mx-auto rounded-full transition-all text-[11px]
                  ${start || end ? "text-white" : "hover:bg-opacity-80"}
                  ${isToday(day) && !start && !end ? "ring-1 ring-offset-1" : ""}
                `}
                style={{
                  backgroundColor: start || end ? PERSIAN_BLUE : undefined,
                }}
              >
                {day}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 pt-1.5 border-t border-gray-100 text-[10px] font-medium text-gray-400 text-center">
        {selecting === "start" ? "Select departure date" : "Now select return date"}
      </div>
    </div>
  );
}

const fmt = (d) => (d ? d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null);

export default function BoardingPassSearch({ onSearch }) {
  // Main inputs
  const [fromCity, setFromCity] = useState("");
  const [whereTo, setWhereTo] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budget, setBudget] = useState("");

  // Toggles
  const [showCal, setShowCal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Advanced Filter States (Default Unselected)
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [accommodation, setAccommodation] = useState("");
  const [transport, setTransport] = useState("");
  const [tripType, setTripType] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [wheelchair, setWheelchair] = useState(false);
  const [travelStyle, setTravelStyle] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const calRef = useRef(null);
  const filterRef = useRef(null);

  // Close calendar or filters on outside click
  useEffect(() => {
    const handler = (e) => {
      if (calRef.current && !calRef.current.contains(e.target)) setShowCal(false);
      if (filterRef.current && !filterRef.current.contains(e.target)) setShowFilters(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDateSelect = (s, e) => {
    setStartDate(s);
    setEndDate(e);
  };

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const resetAllFilters = () => {
    setAdults(2);
    setChildren(0);
    setRooms(1);
    setAccommodation("");
    setTransport("");
    setTripType("");
    setSelectedInterests([]);
    setWheelchair(false);
    setTravelStyle("");
    setSpecialRequests("");
  };

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({
        fromCity,
        whereTo,
        startDate,
        endDate,
        budget,
        filters: {
          adults,
          children,
          rooms,
          accommodation,
          transport,
          tripType,
          selectedInterests,
          wheelchair,
          travelStyle,
          specialRequests,
        },
      });
    }
  };

  const clearDates = (ev) => {
    ev.stopPropagation();
    setStartDate(null);
    setEndDate(null);
  };

  const dateLabel =
    startDate && endDate ? `${fmt(startDate)} – ${fmt(endDate)}` : startDate ? `${fmt(startDate)} – ?` : null;

  return (
    <div className="w-full max-w-5xl mx-auto relative z-30">
      {/* ── Search Bar ── */}
      <div
        className="bg-white flex items-stretch shadow-[0_6px_24px_rgba(28,63,148,0.12)] overflow-visible"
        style={{ border: `4px solid ${PERSIAN_BLUE}` }}
      >
        {/* FROM */}
        <div className="flex-[2] min-w-0 flex items-center gap-3 px-5 py-4 hover:bg-blue-50/40 transition-colors">
          <MapPin size={18} className="flex-shrink-0" style={{ color: PERSIAN_BLUE }} />
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">From</p>
            <input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Departure city"
              className="block w-full text-sm font-bold text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-500 placeholder:font-medium mt-0.5 truncate"
            />
            <p className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">Enter departure city</p>
          </div>
        </div>

        {/* WHERE TO */}
        <div className="flex-[2] min-w-0 flex items-center gap-3 px-5 py-4 hover:bg-blue-50/40 transition-colors">
          <MapPin size={18} className="flex-shrink-0" style={{ color: PERSIAN_BLUE }} />
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Where</p>
            <input
              type="text"
              value={whereTo}
              onChange={(e) => setWhereTo(e.target.value)}
              placeholder="Destination"
              className="block w-full text-sm font-bold text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-500 placeholder:font-medium mt-0.5 truncate"
            />
            <p className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">Enter destination</p>
          </div>
        </div>

        {/* DURATION */}
        <div ref={calRef} className="relative flex-[2.2] min-w-0">
          <button
            type="button"
            onClick={() => setShowCal((p) => !p)}
            className="w-full h-full flex items-center gap-3 px-5 py-4 hover:bg-blue-50/40 transition-colors text-left"
          >
            <Calendar size={18} className="flex-shrink-0" style={{ color: PERSIAN_BLUE }} />
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Duration</p>
              {dateLabel ? (
                <div className="flex items-center gap-1 mt-0.5 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: PERSIAN_BLUE }}>
                    {dateLabel}
                  </p>
                  <button
                    onClick={clearDates}
                    className="flex-shrink-0 hover:text-red-500 text-gray-400 transition-colors ml-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <p className="text-sm font-bold text-gray-700 mt-0.5 whitespace-nowrap">Add dates</p>
              )}
              <p className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">
                {startDate && endDate
                  ? `${Math.round((endDate - startDate) / 86400000)} nights`
                  : startDate
                  ? "Select return date"
                  : "Select dates"}
              </p>
            </div>
          </button>

          {showCal && (
            <div className="absolute bottom-full left-0 mb-2 z-50">
              <CalendarPicker
                startDate={startDate}
                endDate={endDate}
                onSelect={handleDateSelect}
                onClose={() => setShowCal(false)}
              />
            </div>
          )}
        </div>

        {/* BUDGET */}
        <div className="flex-[1.6] min-w-0 flex items-center gap-3 px-5 py-4 hover:bg-blue-50/40 transition-colors">
          <IndianRupee size={18} className="flex-shrink-0" style={{ color: PERSIAN_BLUE }} />
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Budget</p>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Amount"
              className="block w-full text-sm font-bold text-gray-800 bg-transparent focus:outline-none placeholder:text-gray-500 placeholder:font-medium mt-0.5 truncate"
            />
            <p className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">Enter budget (₹)</p>
          </div>
        </div>

        {/* MORE FILTERS TRIGGER (Clicking ANYWHERE in box/icon/label/text opens drawer) */}
        <div ref={filterRef} className="relative flex-[1.8] min-w-0">
          <button
            type="button"
            onClick={() => setShowFilters((p) => !p)}
            className="w-full h-full flex items-center gap-3 px-5 py-4 hover:bg-blue-50/40 transition-colors text-left cursor-pointer group"
          >
            <SlidersHorizontal size={18} className="flex-shrink-0 transition-transform group-hover:scale-110" style={{ color: PERSIAN_BLUE }} />
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">Filters</p>
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#1C3F94] transition-colors mt-0.5 whitespace-nowrap">
                More filters
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 whitespace-nowrap">Customize trip</p>
            </div>
          </button>

          {/* ── Advanced Filters Popover Drawer ── */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-3 z-50 w-[840px] max-w-[90vw] bg-white rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 text-left"
              >
                {/* Pointer Arrow */}
                <div className="absolute -top-2 right-16 w-4 h-4 bg-white border-t border-l border-slate-200 rotate-45 z-20" />

                <div className="space-y-5 relative z-10">
                  {/* ── ROW 1: Guests Steppers & Accommodation ── */}
                  <div className="grid grid-cols-12 gap-4 items-start">
                    {/* Adults */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Adults (15+)</label>
                      <div className="flex items-center justify-between border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50/50">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:border-slate-300 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-xs text-slate-800">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-[#2563EB] hover:bg-white hover:border-blue-300 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Ages 15 and above</p>
                    </div>

                    {/* Children */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Children</label>
                      <div className="flex items-center justify-between border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50/50">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:border-slate-300 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-xs text-slate-800">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-[#2563EB] hover:bg-white hover:border-blue-300 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Ages 2 – 15</p>
                    </div>

                    {/* Rooms */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Rooms</label>
                      <div className="flex items-center justify-between border border-slate-200 rounded-xl px-2.5 py-1.5 bg-slate-50/50">
                        <button
                          type="button"
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-white hover:border-slate-300 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-xs text-slate-800">{rooms}</span>
                        <button
                          type="button"
                          onClick={() => setRooms(rooms + 1)}
                          className="w-6 h-6 rounded-md border border-slate-200 flex items-center justify-center text-[#2563EB] hover:bg-white hover:border-blue-300 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Separate rooms</p>
                    </div>

                    {/* Accommodation Type */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Accommodation Type</label>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { name: "Budget", icon: Wallet },
                          { name: "Standard", icon: Building },
                          { name: "Premium", icon: Gem },
                          { name: "Luxury", icon: Crown },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isActive = accommodation === item.name;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setAccommodation(item.name)}
                              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all text-center ${
                                isActive
                                  ? "border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-bold shadow-xs"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <IconComp size={14} className="mb-0.5" />
                              <span className="text-[9px] leading-tight font-semibold">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ── ROW 2: Transport, Trip Type & Interests ── */}
                  <div className="grid grid-cols-12 gap-4 items-start">
                    {/* Preferred Transport */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Preferred Transport</label>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { name: "Flight", icon: Plane },
                          { name: "Train", icon: Train },
                          { name: "Bus", icon: Bus },
                          { name: "Self Drive", icon: Car },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isActive = transport === item.name;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setTransport(item.name)}
                              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all text-center ${
                                isActive
                                  ? "border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-bold shadow-xs"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <IconComp size={14} className="mb-0.5" />
                              <span className="text-[9px] leading-tight font-semibold">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Trip Type */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Trip Type</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { name: "Solo", icon: User },
                          { name: "Couple", icon: Heart },
                          { name: "Family", icon: Users },
                          { name: "Friends", icon: UserCheck },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isActive = tripType === item.name;
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => setTripType(item.name)}
                              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border transition-all ${
                                isActive
                                  ? "border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-bold shadow-xs"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <IconComp size={13} />
                              <span className="text-[11px] font-semibold">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interests (Flexible wrap pill grid so NO text truncates) */}
                    <div className="col-span-6">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">
                        Interests <span className="font-normal text-slate-400 text-[10px]">(Select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "Nature", icon: Trees },
                          { name: "Adventure", icon: Mountain },
                          { name: "Beaches", icon: Palmtree },
                          { name: "Spiritual", icon: Flower2 },
                          { name: "Shopping", icon: ShoppingBag },
                          { name: "Food", icon: Utensils },
                          { name: "Wildlife", icon: PawPrint },
                          { name: "History", icon: Landmark },
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isSelected = selectedInterests.includes(item.name);
                          return (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => handleInterestToggle(item.name)}
                              className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border transition-all ${
                                isSelected
                                  ? "border-[#2563EB] bg-blue-50/70 text-[#2563EB] font-bold shadow-xs"
                                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <IconComp size={13} />
                              <span className="text-[11px] font-semibold whitespace-nowrap">{item.name}</span>
                              {isSelected && (
                                <span className="w-3.5 h-3.5 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-[8px] ml-0.5">
                                  ✓
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* ── ROW 3: Accessibility, Travel Style & Special Requests ── */}
                  <div className="grid grid-cols-12 gap-4 items-center pt-1 border-t border-slate-100">
                    {/* Accessibility */}
                    <div className="col-span-4">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Accessibility</label>
                      <div
                        onClick={() => setWheelchair(!wheelchair)}
                        className={`flex items-center justify-between p-2 rounded-xl border cursor-pointer transition-all ${
                          wheelchair ? "border-[#2563EB] bg-blue-50/40" : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Accessibility size={15} className="text-slate-600" />
                          <span className="text-[11px] font-semibold text-slate-700">Wheelchair Friendly</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={wheelchair}
                          onChange={() => {}}
                          className="accent-[#2563EB] w-3.5 h-3.5 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Travel Style */}
                    <div className="col-span-3">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">Travel Style</label>
                      <div className="relative">
                        <select
                          value={travelStyle}
                          onChange={(e) => setTravelStyle(e.target.value)}
                          className="w-full text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 appearance-none focus:outline-none focus:border-[#2563EB] cursor-pointer"
                        >
                          <option value="">Select style...</option>
                          <option value="Relaxed">🛏️ Relaxed</option>
                          <option value="Fast-paced">⚡ Fast-paced</option>
                          <option value="Balanced">⚖️ Balanced</option>
                          <option value="Off-beat">🌿 Off-beat</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="col-span-5">
                      <label className="text-[11px] font-bold text-slate-800 block mb-1">
                        Special Requests <span className="font-normal text-slate-400 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="e.g. Early check-in, mountain view, etc."
                        className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#2563EB] placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* ── FOOTER: Reset All & Apply Filters CTA ── */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                    <button
                      type="button"
                      onClick={resetAllFilters}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      <RotateCcw size={13} />
                      <span>Reset All</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowFilters(false);
                        handleSubmit();
                      }}
                      className="px-7 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PROCEED BUTTON */}
        <button
          onClick={handleSubmit}
          type="button"
          className="flex-shrink-0 flex items-center gap-2.5 px-8 text-white font-bold text-sm transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: PERSIAN_BLUE }}
        >
          <Search size={17} strokeWidth={2.5} />
          Proceed
        </button>
      </div>
    </div>
  );
}
