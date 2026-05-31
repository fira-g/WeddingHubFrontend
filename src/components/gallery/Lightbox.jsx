import { useEffect, useState } from "react";
import {
  useGalleryStore,
  loadLocalReactions,
  saveLocalReactions,
  loadUserReacted,
  saveUserReacted,
} from "@/store";
import { LOCAL_GALLERY, REACTION_EMOJIS } from "@/constants";
import { reactionAPI } from "@/services/api";
import { getSessionId } from "@/utils/session";

export default function Lightbox() {
  const photos = useGalleryStore((s) => s.photos);
  const index = useGalleryStore((s) => s.lightboxIndex);
  const close = useGalleryStore((s) => s.closeLightbox);
  const nextPhoto = useGalleryStore((s) => s.nextPhoto);
  const prevPhoto = useGalleryStore((s) => s.prevPhoto);
  const updateReactions = useGalleryStore((s) => s.updatePhotoReactions);

  // Use API photos if available, else local fallback
  const displayPhotos = photos.length > 0 ? photos : LOCAL_GALLERY;
  const total = displayPhotos.length;
  const photo = index !== null && index >= 0 ? displayPhotos[index] : null;

  const [reactions, setReactions] = useState({});
  const [userReacted, setUserReacted] = useState({});
  const [rxLoading, setRxLoading] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const sessionId = getSessionId();

  const isLocal = (p) => !p || !p._id || String(p._id || p.id).startsWith("lg");

  // Load reactions when photo changes
  useEffect(() => {
    if (!photo) return;
    if (isLocal(photo)) {
      // Persist locally
      const allRx = loadLocalReactions();
      const allUr = loadUserReacted();
      const pid = photo.id || photo._id;
      setReactions(allRx[pid] || {});
      setUserReacted(allUr[pid] || {});
    } else {
      reactionAPI
        .get(photo._id, sessionId)
        .then((res) => {
          setReactions(res.reactions || {});
          setUserReacted(res.userReacted || {});
        })
        .catch(() => {});
    }
  }, [index]);

  // Keyboard nav
  useEffect(() => {
    if (index === null) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nextPhoto(total);
      if (e.key === "ArrowLeft") prevPhoto(total);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, total, close, nextPhoto, prevPhoto]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextPhoto(total) : prevPhoto(total);
    setTouchStart(null);
  };

  const handleReact = async (emoji) => {
    if (rxLoading) return;
    if (isLocal(photo)) {
      const pid = photo.id || photo._id;
      const allRx = loadLocalReactions();
      const allUr = loadUserReacted();
      const already = !!(allUr[pid] || {})[emoji];
      const newCount = Math.max(
        0,
        (allRx[pid]?.[emoji] || 0) + (already ? -1 : 1),
      );
      const newRx = {
        ...allRx,
        [pid]: { ...(allRx[pid] || {}), [emoji]: newCount },
      };
      const newUr = {
        ...allUr,
        [pid]: { ...(allUr[pid] || {}), [emoji]: !already },
      };
      saveLocalReactions(newRx);
      saveUserReacted(newUr);
      setReactions(newRx[pid]);
      setUserReacted(newUr[pid]);
      return;
    }
    setRxLoading(true);
    try {
      const res = await reactionAPI.toggle(photo._id, emoji, sessionId);
      setReactions(res.reactions || {});
      setUserReacted((u) => ({ ...u, [emoji]: res.action === "added" }));
      updateReactions(photo._id, res.reactions);
    } catch {
    } finally {
      setRxLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.origin + "/gallery";
    const text = `Ayantu & Eyob — ${photo?.caption || "Wedding Memories"}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareMsg("Copied!");
        setTimeout(() => setShareMsg(""), 2000);
      } catch {}
    }
  };

  if (index === null || !photo) return null;

  const imgSrc = photo.imageUrl || photo.url;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col select-none max-h-full w-full"
      style={{
        background: "rgba(10,5,2,0.97)",
        WebkitTapHighlightColor: "transparent",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
        <span className="font-sans text-[11px] tracking-[3px] text-white/30">
          {index + 1} / {total}
        </span>
        <button
          onClick={close}
          className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/80 hover:bg-white/20 transition-colors"
          style={{ fontSize: 18, lineHeight: 1 }}
        >
          ✕
        </button>
      </div>

      {/* ── Image area ── */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 px-2">
        {/* Prev arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevPhoto(total);
          }}
          className="absolute left-2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/25 transition-all active:scale-90"
          style={{ fontSize: 22 }}
        >
          ‹
        </button>

        <img
          key={imgSrc}
          src={imgSrc}
          alt={photo.caption}
          className="max-w-full rounded-2xl object-contain shadow-2xl"
          style={{
            maxHeight: "calc(100dvh - 210px)",
            transition: "opacity 0.2s",
          }}
          draggable={false}
        />

        {/* Next arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextPhoto(total);
          }}
          className="absolute right-2 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white flex items-center justify-center hover:bg-white/25 transition-all active:scale-90"
          style={{ fontSize: 22 }}
        >
          ›
        </button>
      </div>

      {/* ── Caption ── */}
      <div className="px-6 pt-2 pb-1 text-center flex-shrink-0">
        <p className="text-[#e8d8c4] italic text-base font-serif leading-snug">
          {photo.caption}
        </p>
        <span className="font-sans bg-gold-400/50 text-white/90 text-[10px] tracking-widest uppercase px-3 py-0.5 rounded-full mt-1 inline-block">
          {photo.category}
        </span>
      </div>

      {/* ── Reactions + Share ── */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 flex-shrink-0">
        {REACTION_EMOJIS.map((emoji) => {
          const count = reactions[emoji] || 0;
          const active = !!userReacted[emoji];
          return (
            <button
              key={emoji}
              onClick={() => handleReact(emoji)}
              className={`flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-2xl border transition-all duration-150 active:scale-95
                ${
                  active
                    ? "bg-gold-400/30 border-gold-400/70 scale-110 shadow-[0_0_12px_rgba(196,150,90,0.3)]"
                    : "bg-white/5 border-white/10 hover:bg-white/15"
                }`}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{emoji}</span>
              <span
                className={`font-sans text-[10px] transition-colors ${active ? "text-gold-300" : "text-white/40"}`}
              >
                {count > 0 ? count : ""}
              </span>
            </button>
          );
        })}
        {/* Share */}
        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-2xl border bg-white/5 border-white/10 hover:bg-white/15 transition-all active:scale-95 ml-1"
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>🔗</span>
          <span className="font-sans text-[10px] text-white/40">
            {shareMsg || "Share"}
          </span>
        </button>
      </div>

      {/* ── Swipe hint ── */}
      <p className="font-sans text-white/15 text-[9px] text-center pb-2 tracking-[4px] flex-shrink-0">
        SWIPE TO NAVIGATE
      </p>
    </div>
  );
}
