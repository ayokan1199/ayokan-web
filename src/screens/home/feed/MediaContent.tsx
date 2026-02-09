// src/home/feed/MediaContent.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";

export type FeedMedia = {
  url: string;
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  posterUrl?: string; // pour video
  alt?: string;

  // optionnel
  aspect?: "9:16" | "1:1" | "4:5" | "16:9";
  blurHashPlaceholder?: string; // futur
};

type MediaContentProps = {
  type: "reel" | "image" | "live-clip" | "game-highlight";
  media: FeedMedia;

  autoPlay?: boolean; // pour video
  muted?: boolean;
  controls?: boolean;

  onClickOverlay?: () => void; // ex: ouvrir post
};

const MediaContent: React.FC<MediaContentProps> = ({
  type,
  media,
  autoPlay = true,
  muted = true,
  controls = false,
  onClickOverlay,
}) => {
  const isVideo = type === "reel" || type === "live-clip" || type === "game-highlight";
  const ratio = useMemo(() => aspectToRatio(media.aspect, type), [media.aspect, type]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      <style>{css}</style>

      {/* ratio box */}
      <div className="relative w-full" style={{ paddingTop: `${ratio * 100}%` }}>
        <div className="absolute inset-0">
          {/* glow overlays */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-[260px] w-[260px] rounded-full blur-3xl media-glow-rose" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-[300px] w-[300px] rounded-full blur-3xl media-glow-gold" />

          {/* content */}
          {isVideo ? (
            <VideoBlock
              url={media.url}
              posterUrl={media.posterUrl}
              autoPlay={autoPlay}
              muted={muted}
              controls={controls}
            />
          ) : (
            <ImageBlock url={media.url} alt={media.alt} />
          )}

          {/* subtle gradient */}
          <div className="pointer-events-none absolute inset-0 media-surface" />

          {/* top-left type chip */}
          <div className="absolute left-3 top-3 z-[3]">
            <TypeChip type={type} />
          </div>

          {/* bottom overlay actions */}
          <button
            type="button"
            onClick={onClickOverlay}
            className="absolute inset-0 z-[2] cursor-pointer bg-transparent"
            aria-label="Ouvrir le contenu"
          />
        </div>
      </div>
    </div>
  );
};

export default MediaContent;

/* ---------------------------------- */

type VideoBlockProps = {
  url: string;
  posterUrl?: string;
  autoPlay: boolean;
  muted: boolean;
  controls: boolean;
};

const VideoBlock: React.FC<VideoBlockProps> = ({ url, posterUrl, autoPlay, muted, controls }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onCanPlay = () => setCanPlay(true);
    el.addEventListener("canplay", onCanPlay);
    return () => el.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div className="absolute inset-0">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={url}
        poster={posterUrl}
        playsInline
        loop
        muted={muted}
        controls={controls}
        autoPlay={autoPlay}
        preload="metadata"
      />
      {!canPlay ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="media-loader" aria-hidden="true" />
        </div>
      ) : null}
    </div>
  );
};

const ImageBlock: React.FC<{ url: string; alt?: string }> = ({ url, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0">
      <img
        src={url}
        alt={alt ?? "Media"}
        className="h-full w-full object-cover"
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
      {!loaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="media-loader" aria-hidden="true" />
        </div>
      ) : null}
    </div>
  );
};

const TypeChip: React.FC<{ type: MediaContentProps["type"] }> = ({ type }) => {
  const { label, icon, style } = chipMeta(type);
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-black"
      style={style}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
};

function chipMeta(type: MediaContentProps["type"]) {
  if (type === "reel") {
    return {
      label: "Reel",
      icon: "🎥",
      style: {
        background: "rgba(232,162,182,0.16)",
        border: "1px solid rgba(232,162,182,0.22)",
        color: "rgba(255,235,245,0.92)",
      } as React.CSSProperties,
    };
  }
  if (type === "live-clip") {
    return {
      label: "Extrait LIVE",
      icon: "📺",
      style: {
        background: "rgba(255,59,59,0.12)",
        border: "1px solid rgba(255,59,59,0.20)",
        color: "rgba(255,220,220,0.92)",
      } as React.CSSProperties,
    };
  }
  if (type === "game-highlight") {
    return {
      label: "Game",
      icon: "🎮",
      style: {
        background: "rgba(170,90,255,0.14)",
        border: "1px solid rgba(170,90,255,0.22)",
        color: "rgba(235,220,255,0.92)",
      } as React.CSSProperties,
    };
  }
  return {
    label: "Image",
    icon: "🖼️",
    style: {
      background: "rgba(255,255,255,0.10)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "rgba(255,255,255,0.90)",
    } as React.CSSProperties,
  };
}

function aspectToRatio(
  aspect: FeedMedia["aspect"] | undefined,
  type: MediaContentProps["type"]
) {
  // ratio = height/width, because paddingTop expects that
  if (aspect === "9:16") return 16 / 9;
  if (aspect === "1:1") return 1;
  if (aspect === "4:5") return 5 / 4;
  if (aspect === "16:9") return 9 / 16;

  // defaults by type
  if (type === "reel") return 16 / 9; // vertical feeling inside card
  return 5 / 4;
}

const css = `
.media-glow-rose{
  background: radial-gradient(circle, rgba(232,162,182,0.14), transparent 70%);
}
.media-glow-gold{
  background: radial-gradient(circle, rgba(215,178,124,0.12), transparent 70%);
}
.media-surface{
  background: linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.35) 100%);
}

.media-loader{
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 2px solid rgba(255,255,255,0.20);
  border-top-color: rgba(232,162,182,0.85);
  border-right-color: rgba(215,178,124,0.75);
  animation: aykSpin 0.9s linear infinite;
  filter: drop-shadow(0 8px 22px rgba(0,0,0,0.40));
}
@keyframes aykSpin{
  from{ transform: rotate(0deg); }
  to{ transform: rotate(360deg); }
}
`;
