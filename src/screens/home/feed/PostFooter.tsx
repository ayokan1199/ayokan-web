// src/screens/home/feed/PostFooter.tsx
import React, { useMemo, useState } from "react";

type PostFooterProps = {
  caption?: string;
  hashtags?: string[];
  isAdult?: boolean;

  onOpenHashtag?: (tag: string) => void;
};

const PostFooter: React.FC<PostFooterProps> = ({
  caption,
  hashtags,
  isAdult,
  onOpenHashtag,
}) => {
  const [expanded, setExpanded] = useState(false);

  const tags = useMemo(() => normalizeTags(hashtags), [hashtags]);

  const hasCaption = !!(caption && caption.trim());
  const showMore = hasCaption && caption!.trim().length > 120;

  return (
    <div className="mt-3 px-1">
      <style>{css}</style>

      {(isAdult || hasCaption) && (
        <div className="flex flex-wrap items-start gap-2">
          {isAdult ? (
            <span className="ayk-pill ayk-pill-adult" aria-label="Contenu adulte">
              🔞 +18
            </span>
          ) : null}

          {hasCaption ? (
            <p className={["ayk-caption", expanded ? "" : "ayk-clamp-2"].join(" ")}>
              {caption!.trim()}
            </p>
          ) : null}
        </div>
      )}

      {showMore ? (
        <button
          type="button"
          className="ayk-more"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Réduire la description" : "Voir plus"}
        >
          {expanded ? "Réduire" : "Voir plus"}
        </button>
      ) : null}

      {tags.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              className="ayk-tag"
              onClick={() => onOpenHashtag?.(t)}
              aria-label={`Hashtag ${t}`}
            >
              #{t}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostFooter;

/* ---------------------------------- */

function normalizeTags(tags?: string[]) {
  if (!tags || tags.length === 0) return [];
  const cleaned = tags
    .map((t) => String(t || "").trim().replace(/^#/, ""))
    .filter(Boolean);

  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of cleaned) {
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out.slice(0, 12);
}

const css = `
.ayk-pill{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .04em;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.30);
  color: rgba(255,255,255,0.86);
}
.ayk-pill-adult{
  background: rgba(0,0,0,0.45);
}

.ayk-caption{
  font-size: 13px;
  font-weight: 700;
  color: rgba(255,255,255,0.80);
  line-height: 1.45;
  margin: 0;
  max-width: 100%;
}

.ayk-more{
  margin-top: 6px;
  border: none;
  background: transparent;
  color: rgba(232,162,182,0.95);
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}
.ayk-more:hover{
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ayk-tag{
  cursor: pointer;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.06);
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 900;
  color: rgba(255,255,255,0.78);
}
.ayk-tag:hover{
  background: rgba(255,255,255,0.12);
}
.ayk-tag:active{
  transform: scale(.98);
}

/* clamp without tailwind plugin */
.ayk-clamp-2{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
`;
