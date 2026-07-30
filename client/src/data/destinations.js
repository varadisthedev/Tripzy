// src/data/destinations.js

// ===============================
// KASHMIR IMAGES
// ===============================
import kashmir from "../assets/images/Kashmir.png";
import srinagar from "../assets/images/Srinagar.jpeg";
import gulmarg from "../assets/images/Gulmarg.jpeg";
import pahalgam from "../assets/images/Pahalgam.jpeg";
import sonamarg from "../assets/images/Sonamarg.jpeg";

// ===============================
// RAJASTHAN IMAGES
// ===============================
import rajasthan from "../assets/images/Rajasthan.png";
import jaisalmer from "../assets/images/Jaisalmer.jpeg";
import jaipur from "../assets/images/Jaipur.jpeg";
import udaipur from "../assets/images/Udaipur.jpeg";
import jodhpur from "../assets/images/Jodhpur.jpeg";

// ===============================
// KERALA IMAGES
// ===============================
import kerala from "../assets/images/Kerela.png";
import munnar from "../assets/images/Munnar.jpeg";
import alleppey from "../assets/images/Alleppey.jpeg";
import kochi from "../assets/images/Kochi.jpeg";
import varkala from "../assets/images/Varkala.jpeg";

// ===============================
// GOA IMAGES
// ===============================
import goa from "../assets/images/Goa.png";
import panjim from "../assets/images/Panjim.jpeg";
import calangute from "../assets/images/Calangute.jpeg";
import anjuna from "../assets/images/Anjuna.jpeg";
import palolem from "../assets/images/Palolem.jpeg";

// ===============================
// MEGHALAYA IMAGES
// ===============================
import meghalaya from "../assets/images/Meghalaya.png";
import shillong from "../assets/images/Shillong.jpeg";
import cherrapunji from "../assets/images/Cherrapunji.jpeg";
import dawki from "../assets/images/Dawki.jpeg";
import mawlynnong from "../assets/images/Mawlynnong.jpeg";

// ===============================
// HIMACHAL IMAGES
// ===============================
import himachal from "../assets/images/Himachal.png";
import manali from "../assets/images/Manali.jpeg";
import shimla from "../assets/images/Shimla.jpeg";
import dharamshala from "../assets/images/Dharamshala.jpeg";
import spiti from "../assets/images/Spiti.jpeg";

// ===============================
// VARANASI IMAGES
// ===============================
import varanasi from "../assets/images/Varanasi.png";
import dashashwamedh from "../assets/images/Dashashwamedh.jpeg";
import sarnath from "../assets/images/Sarnath.jpeg";
import manikarnika from "../assets/images/Manikarnika.jpeg";
import kashiVishwanath from "../assets/images/KashiVishwanath.jpeg";

// ===============================
// LADAKH IMAGES
// ===============================
import ladakh from "../assets/images/Ladakh.png";
import leh from "../assets/images/Leh.jpeg";
import pangong from "../assets/images/Pangong.jpeg";
import nubra from "../assets/images/Nubra.jpeg";
import zanskar from "../assets/images/Zanskar.jpeg";


// =====================================================
// DESTINATIONS
// =====================================================

export const destinations = [
  // ===============================
  // KASHMIR
  // ===============================
  {
    id: "kashmir",
    name: "Kashmir",
    tagline: "Where heaven touches earth.",
    description:
      "Snow-covered mountains, serene lakes, and timeless landscapes create journeys worth remembering forever.",
    bgImage: kashmir,
    accent: "#5bc8c8",

    places: [
      {
        name: "Srinagar",
        tag: "Dal Lake & Houseboats",
        image: srinagar,
      },
      {
        name: "Gulmarg",
        tag: "Asia's Finest Ski Resort",
        image: gulmarg,
      },
      {
        name: "Pahalgam",
        tag: "Valley of Shepherds",
        image: pahalgam,
      },
      {
        name: "Sonamarg",
        tag: "Meadow of Gold",
        image: sonamarg,
      },
    ],
  },


  // ===============================
  // RAJASTHAN
  // ===============================
  {
    id: "rajasthan",
    name: "Rajasthan",
    tagline: "Where every road tells a story.",
    description:
      "Discover India's timeless forts, vibrant cities, golden deserts, and unforgettable royal experiences.",
    bgImage: rajasthan,
    accent: "#e8a838",

    places: [
      {
        name: "Jaisalmer",
        tag: "The Golden City",
        image: jaisalmer,
      },
      {
        name: "Jaipur",
        tag: "The Pink City",
        image: jaipur,
      },
      {
        name: "Udaipur",
        tag: "City of Lakes",
        image: udaipur,
      },
      {
        name: "Jodhpur",
        tag: "The Blue City",
        image: jodhpur,
      },
    ],
  },


  // ===============================
  // KERALA
  // ===============================
  {
    id: "kerala",
    name: "Kerala",
    tagline: "God's Own Country.",
    description:
      "Drift through tranquil backwaters, lush green landscapes, and the slow, beautiful rhythm of the south.",
    bgImage: kerala,
    accent: "#34a853",

    places: [
      {
        name: "Munnar",
        tag: "Tea Garden Hills",
        image: munnar,
      },
      {
        name: "Alleppey",
        tag: "Backwater Paradise",
        image: alleppey,
      },
      {
        name: "Kochi",
        tag: "Queen of the Arabian Sea",
        image: kochi,
      },
      {
        name: "Varkala",
        tag: "Cliff-top Beach Village",
        image: varkala,
      },
    ],
  },


  // ===============================
  // GOA
  // ===============================
  {
    id: "goa",
    name: "Goa",
    tagline: "Where the sea meets freedom.",
    description:
      "Sun-drenched beaches, Portuguese architecture, vibrant nightlife, and the spirit of endless summer.",
    bgImage: goa,
    accent: "#ff7043",

    places: [
      {
        name: "Panjim",
        tag: "Heritage & Culture",
        image: panjim,
      },
      {
        name: "Calangute",
        tag: "Queen of Beaches",
        image: calangute,
      },
      {
        name: "Anjuna",
        tag: "Bohemian Paradise",
        image: anjuna,
      },
      {
        name: "Palolem",
        tag: "Crescent Beach Bliss",
        image: palolem,
      },
    ],
  },


  // ===============================
  // MEGHALAYA
  // ===============================
  {
    id: "meghalaya",
    name: "Meghalaya",
    tagline: "Where clouds are born.",
    description:
      "Discover mist-covered hills, living root bridges, hidden waterfalls, and a world entirely shaped by nature.",
    bgImage: meghalaya,
    accent: "#5bc8c8",

    places: [
      {
        name: "Shillong",
        tag: "Scotland of the East",
        image: shillong,
      },
      {
        name: "Cherrapunji",
        tag: "Wettest Place on Earth",
        image: cherrapunji,
      },
      {
        name: "Dawki",
        tag: "Crystal Clear Rivers",
        image: dawki,
      },
      {
        name: "Mawlynnong",
        tag: "Asia's Cleanest Village",
        image: mawlynnong,
      },
    ],
  },


  // ===============================
  // HIMACHAL PRADESH
  // ===============================
  {
    id: "himachal",
    name: "Himachal Pradesh",
    tagline: "Land of the Gods.",
    description:
      "Alpine meadows, pine-scented valleys, ancient temples, and some of the world's most dramatic mountain roads.",
    bgImage: himachal,
    accent: "#7c9cbf",

    places: [
      {
        name: "Manali",
        tag: "Gateway to Adventure",
        image: manali,
      },
      {
        name: "Shimla",
        tag: "Queen of Hills",
        image: shimla,
      },
      {
        name: "Dharamshala",
        tag: "Little Lhasa",
        image: dharamshala,
      },
      {
        name: "Spiti Valley",
        tag: "Middle Land",
        image: spiti,
      },
    ],
  },


  // ===============================
  // VARANASI
  // ===============================
  {
    id: "varanasi",
    name: "Varanasi",
    tagline: "Older than history itself.",
    description:
      "Experience the timeless rhythm of the Ganges, where spirituality, culture, and ancient history meet at dawn.",
    bgImage: varanasi,
    accent: "#f4a261",

    places: [
      {
        name: "Dashashwamedh Ghat",
        tag: "Grand Evening Aarti",
        image: dashashwamedh,
      },
      {
        name: "Sarnath",
        tag: "Where Buddha Taught",
        image: sarnath,
      },
      {
        name: "Manikarnika Ghat",
        tag: "The Burning Ghat",
        image: manikarnika,
      },
      {
        name: "Kashi Vishwanath",
        tag: "Sacred Shiva Temple",
        image: kashiVishwanath,
      },
    ],
  },


  // ===============================
  // LADAKH
  // ===============================
  {
    id: "ladakh",
    name: "Ladakh",
    tagline: "Where the sky begins.",
    description:
      "Ride beyond the ordinary — dramatic mountains, monastery-dotted ridges, and endless skies turn every road into an adventure.",
    bgImage: ladakh,
    accent: "#8ecae6",

    places: [
      {
        name: "Leh",
        tag: "Gateway to Ladakh",
        image: leh,
      },
      {
        name: "Pangong Lake",
        tag: "Sky-Blue High-Altitude Lake",
        image: pangong,
      },
      {
        name: "Nubra Valley",
        tag: "Valley of Flowers",
        image: nubra,
      },
      {
        name: "Zanskar",
        tag: "Frozen River Trek",
        image: zanskar,
      },
    ],
  },
];


// =====================================================
// EXPLORE STEPS
// =====================================================

export const exploreSteps = [
  {
    id: "discover",
    label: "Discover",
    icon: "Compass",
    description:
      "Explore curated Indian destinations matched to your travel style and preferences.",
  },
  {
    id: "choose",
    label: "Choose",
    icon: "MapPin",
    description:
      "Select from hundreds of verified destinations, experiences, and routes across India.",
  },
  {
    id: "compare",
    label: "Compare",
    icon: "BarChart2",
    description:
      "Compare costs, seasons, travel times, and experiences side-by-side with AI insights.",
  },
  {
    id: "predict",
    label: "Predict",
    icon: "Sparkles",
    description:
      "Our AI predicts the best time to visit, budget ranges, and crowd levels for each destination.",
  },
  {
    id: "plan",
    label: "Plan",
    icon: "CalendarDays",
    description:
      "Get a fully personalized day-by-day itinerary built around how you want to travel.",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "Plane",
    description:
      "Hit the road confidently with your AI-crafted Indian travel plan in hand.",
  },
];