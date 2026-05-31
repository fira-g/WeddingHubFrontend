// ─── Wedding Info ────────────────────────────────────────────────────────────
export const WEDDING = {
  bride: "Ayantu",
  groom: "Eyob",
  date: new Date("2026-06-27T16:00:00"),
  dateLabel: "June 27, 2026",
  venue: "St. Mary's Cathedral",
  city: "Addis Ababa",
  quote:
    '"Two are better than one… for if they fall, one will lift up the other."',
  verse: "Ecclesiastes 4:9",
  story: `What started as a chance encounter at a rainy bookshop in Addis became
the greatest story either of us ever read. Ayantu was reaching for the same book —
Eyob had already claimed it, but gladly gave it up. That was the first of many
gifts they would give each other.`,
};

// ─── Event Timeline ───────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    time: "2:00 PM",
    event: "Guest Arrival",
    detail: "Doors open, music begins",
    emoji: "🕑",
  },
  {
    time: "4:00 PM",
    event: "Ceremony",
    detail: "St. Mary's Cathedral",
    emoji: "💍",
  },
  {
    time: "6:30 PM",
    event: "Cocktail Hour",
    detail: "Garden Terrace",
    emoji: "🥂",
  },
  {
    time: "8:00 PM",
    event: "Reception",
    detail: "Grand Ballroom",
    emoji: "🎶",
  },
];

// ─── Local gallery photos (served from /public/gallery/) ─────────────────────
// Replace filenames with your actual wedding photos.
// Put all .jpg files inside /public/gallery/
export const LOCAL_GALLERY = [
  {
    id: "lg1",
    url: "/gallery/m1.jpg",
    category: "Him",
    caption: "Forever begins",
  },
  {
    id: "lg2",
    url: "/gallery/m2.jpg",
    category: "Him",
    caption: "Forever begins",
  },
  {
    id: "lg3",
    url: "/gallery/m3.jpg",
    category: "Him",
    caption: "Forever begins",
  },

  {
    id: "lg4",
    url: "/gallery/f1.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg5",
    url: "/gallery/f2.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg6",
    url: "/gallery/f4.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "f3",
    url: "/gallery/f3.jpg",
    category: "Her",
    caption: "Forever begins",
  },
  {
    id: "lg7",
    url: "/gallery/b1.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg8",
    url: "/gallery/b2.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg9",
    url: "/gallery/b3.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg10",
    url: "/gallery/b4.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg11",
    url: "/gallery/b5.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg12",
    url: "/gallery/b6.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg13",
    url: "/gallery/b7.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg14",
    url: "/gallery/b8.jpg",
    category: "Together",
    caption: "Forever begins",
  },
  {
    id: "lg15",
    url: "/gallery/b9.jpg",
    category: "Together",
    caption: "Forever begins",
  },
];

export const GALLERY_CATEGORIES = ["All", "Him", "Her", "Together"];

export const REACTION_EMOJIS = ["❤️", "😍", "😭", "🔥", "👏"];

// ─── Routes ───────────────────────────────────────────────────────────────────
export const NAV_ROUTES = [
  { path: "/", id: "home", icon: "🏠", label: "Home" },
  { path: "/gallery", id: "gallery", icon: "🖼", label: "Gallery" },
  { path: "/wishes", id: "wishes", icon: "💌", label: "Wishes" },
  { path: "/memories", id: "memories", icon: "📸", label: "Memories" },
  { path: "/admin", id: "admin", icon: "⚙️", label: "Admin" },
];
