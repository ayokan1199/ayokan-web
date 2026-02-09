// src/screens/home/feed/PostMedia.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export type PostMediaType = "reel" | "image" | "live-clip" | "game-highlight";

export type PostMediaModel = {
  url: string;

  // optional poster/thumbnail
  posterUrl?: string;

  // for reels/video
  isVideo?: boolean;
  muted?: boolean;

  // for UX labels
  title?: string;

  // for routing/open
  href?: string;

  // for safety
  isAdult?: boolean;
};

type PostMediaProps = {
  type: PostMediaType;
  media: PostMediaModel;

  // click/tap (open post)
  onOpen?: () => void;

  // optional overlays
  showTypeBadge?: boolean;
  className?: string;

  // keep aspect ratio stable
  aspect?: "9:16" | "4:5" | "1:1" | "16:9";

  // video controls
  autoPlay?: boolean; // reels only
  loop?: boolean;
};

const PostMedia: React.FC<PostMediaProps> = ({
  type,
  media,
  onOpen,
  showTypeBadge = true,
  className,
  aspect = "4:5",
  autoPlay = true,
  loop = true,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [muted, setMuted] = useState(media.muted ?? true);

  const isVideo = useMemo(() => {
    if (media.isVideo != null) return media.isVideo;
    return type === "reel" || type === "live-clip" || type === "game-highlight";
  }, [media.isVideo, type]);

  const ratioPadding = useMemo(() => {
    switch (aspect) {
      case "9:16":
        return "177.78%";
      case "1:1":
        return "100%";
      case "16:9":
        return "56.25%";
      case "4:5":
      default:
        return "125%";
    }
  }, [aspect]);

  // autoplay attempt (only for video)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;

    v.muted = muted;

    const tryPlay = async () => {
      if (!autoPlay) return;
      try {
        await v.play();
        setIsPaused(false);
      } catch {
        // browser blocked autoplay; user will tap
        setIsPaused(true);
      }
    };

    void tryPlay();
  }, [autoPlay, isVideo, muted]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (v.paused) {
        await v.play();
        setIsPaused(false);
      } else {
        v.pause();
        setIsPaused(true);
      }
    } catch {
      // ignore
    }
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    const v = videoRef.current;
    if (v) v.muted = next;
  };

  const open = () => onOpen?.();

  return (
    <div className={["ayk-pm", className ?? ""].join(" ")}>
      <style>{css}</style>

      <div className="ayk-ratio" style={{ paddingTop: ratioPadding }}>
        <button
          type="button"
          onClick={open}
          className="ayk-hit"
          aria-label="Ouvrir le contenu"
        />

        <div className="ayk-surface">
          {/* Image */}
          {!isVideo ? (
            <img
              src={media.url}
              alt={media.title ?? "Contenu"}
              className={["ayk-img", !isReady ? "isLoading" : ""].join(" ")}
              loading="lazy"
              onLoad={() => setIsReady(true)}
            />
          ) : (
            <video
              ref={videoRef}
              className={["ayk-vid", !isReady ? "isLoading" : ""].join(" ")}
              src={media.url}
              poster={media.posterUrl}
              playsInline
              muted={muted}
              loop={loop}
              controls={false}
              onCanPlay={() => setIsReady(true)}
              onPlay={() => setIsPaused(false)}
              onPause={() => setIsPaused(true)}
            />
          )}

          {/* shimmer while loading */}
          {!isReady ? <div className="ayk-shimmer" aria-hidden="true" /> : null}

          {/* overlays */}
          {showTypeBadge ? (
            <div className="ayk-topLeft">
              <TypeBadge type={type} />
            </div>
          ) : null}

          {media.isAdult ? (
            <div className="ayk-topRight">
              <span className="ayk-adult">🔞 +18</span>
            </div>
          ) : null}

          {/* video controls overlay */}
          {isVideo ? (
            <div className="ayk-controls" aria-label="Contrôles vidéo">
              <button type="button" className="ayk-ctrl" onClick={togglePlay} aria-label="Lecture/Pause">
                {isPaused ? "▶" : "❚❚"}
              </button>

              <button type="button" className="ayk-ctrl" onClick={toggleMute} aria-label="Son">
                {muted ? "🔇" : "🔊"}
              </button>
            </div>
          ) : null}

          {/* gradient footer for readability */}
          <div className="ayk-bottomFade" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default PostMedia;

/* ---------------------------------- */

const TypeBadge: React.FC<{ type: PostMediaType }> = ({ type }) => {
  const label =
    type === "reel"
      ? "REEL"
      : type === "image"
        ? "PHOTO"
        : type === "live-clip"
          ? "LIVE"
          : "GAME";

  return <span className="ayk-type">{label}</span>;
};

const css = `
.ayk-pm{
  width: 100%;
}

.ayk-ratio{
  position: relative;
  width: 100%;
}

.ayk-surface{
  position: absolute;
  inset: 0;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background:
    radial-gradient(260px 180px at 18% 12%, rgba(232,162,182,0.12), transparent 62%),
    radial-gradient(260px 180px at 82% 10%, rgba(215,178,124,0.10), transparent 62%),
    rgba(255,255,255,0.04);
  box-shadow: 0 18px 60px rgba(0,0,0,0.55);
}

.ayk-hit{
  position: absolute;
  inset: 0;
  z-index: 6;
  border: none;
  background: transparent;
  cursor: pointer;
}

.ayk-img, .ayk-vid{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.isLoading{
  opacity: 0.0;
}

.ayk-shimmer{
  position: absolute;
  inset: -40%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
  transform: translateX(-40%);
  animation: aykShimmer 1.1s ease-in-out infinite;
  z-index: 2;
}
@keyframes aykShimmer{
  0% { transform: translateX(-40%); opacity: .7; }
  50% { transform: translateX(0%); opacity: 1; }
  100% { transform: translateX(40%); opacity: .7; }
}

.ayk-topLeft{
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 7;
}

.ayk-topRight{
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 7;
}

.ayk-type{
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.45);
  color: rgba(255,255,255,0.92);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .08em;
}

.ayk-adult{
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.45);
  color: rgba(255,255,255,0.92);
  font-size: 11px;
  font-weight: 900;
}

.ayk-controls{
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 7;
  display: flex;
  gap: 10px;
}

.ayk-ctrl{
  height: 40px;
  width: 40px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,0.12);
  background: rgba(0,0,0,0.48);
  color: rgba(255,255,255,0.92);
  font-weight: 900;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 44px rgba(0,0,0,0.35);
}
.ayk-ctrl:hover{ background: rgba(255,255,255,0.10); }
.ayk-ctrl:active{ transform: scale(.99); }

.ayk-bottomFade{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.52));
}
`;
