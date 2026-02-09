// src/home/plan-cul/PlanCulPreview.tsx
import React from "react";

export type PlanCulUser = {
  id: string;
  name: string;
  age?: number;
  city?: string;
  distanceKm?: number;
  avatarUrl: string;

  isNew?: boolean;
  isPopular?: boolean;

  // statuts
  isVip?: boolean;
  isGold?: boolean;
};

type PlanCulPreviewProps = {
  users: PlanCulUser[];
  onOpenProfile: (userId: string) => void;
  onDiscoverNearby: () => void;
  onOpenPlanCulHub?: () => void;
};

const PlanCulPreview: React.FC<PlanCulPreviewProps> = ({
  users,
  onOpenProfile,
  onDiscoverNearby,
  onOpenPlanCulHub,
}) => {
  return (
    <section className="mt-6" aria-label="Plan Cul Preview">
      <style>{css}</style>

      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-white/90">🔥 Plan Cul ⭐</h2>
          <p className="text-sm font-semibold text-white/60">
            Des profils proches, du désir, et du concret.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenPlanCulHub ? (
            <button
              type="button"
              onClick={onOpenPlanCulHub}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/80 hover:bg-white/10"
            >
              Voir tout
            </button>
          ) : null}

          <button
            type="button"
            onClick={onDiscoverNearby}
            className="rounded-2xl px-4 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
            style={{
              background:
                "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
              boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
            }}
            aria-label="Découvrir des profils proches"
          >
            Découvrir proches
          </button>
        </div>
      </div>

      {/* wrapper */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5">
        {/* glows */}
        <div
          className="pointer-events-none absolute -left-28 -top-28 h-[280px] w-[280px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(232,162,182,0.14), transparent 72%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-28 -bottom-28 h-[300px] w-[300px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(215,178,124,0.12), transparent 72%)",
          }}
        />

        {/* cards */}
        <div className="relative z-[1] flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 lg:grid-cols-4">
          {users.map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => onOpenProfile(u.id)}
              className="group min-w-[240px] md:min-w-0"
              aria-label={`Ouvrir le profil de ${u.name}`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 transition hover:bg-white/7">
                {/* cover */}
                <div className="relative">
                  <img
                    src={u.avatarUrl}
                    alt={u.name}
                    className="h-[240px] w-full object-cover transition group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                  {/* badges top */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {u.isNew ? (
                      <Badge
                        label="🆕 Nouveau"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.14)",
                          color: "rgba(255,255,255,0.92)",
                        }}
                      />
                    ) : null}

                    {u.isPopular ? (
                      <Badge
                        label="🔥 Populaire"
                        style={{
                          background: "rgba(170,90,255,0.16)",
                          border: "1px solid rgba(170,90,255,0.22)",
                          color: "rgba(235,220,255,0.92)",
                        }}
                      />
                    ) : null}

                    {u.isVip ? (
                      <Badge
                        label="VIP"
                        style={{
                          background: "rgba(215,178,124,0.18)",
                          border: "1px solid rgba(215,178,124,0.26)",
                          color: "rgba(255,230,190,0.92)",
                        }}
                      />
                    ) : null}

                    {u.isGold ? (
                      <Badge
                        label="GOLD"
                        style={{
                          background: "rgba(34,197,94,0.14)",
                          border: "1px solid rgba(34,197,94,0.22)",
                          color: "rgba(200,255,220,0.92)",
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                {/* bottom info */}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-black text-white/92">
                          {u.name}
                          {typeof u.age === "number" ? `, ${u.age}` : ""}
                        </span>

                        {/* ✅ Gold badge vert à côté du nom (comme demandé) */}
                        {u.isGold ? (
                          <span
                            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black"
                            style={{
                              background: "rgba(34,197,94,0.16)",
                              border: "1px solid rgba(34,197,94,0.24)",
                              color: "rgba(210,255,225,0.95)",
                            }}
                          >
                            ● Gold
                          </span>
                        ) : null}

                        {/* VIP (doré) */}
                        {u.isVip ? (
                          <span
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-black"
                            style={{
                              background: "rgba(215,178,124,0.18)",
                              border: "1px solid rgba(215,178,124,0.26)",
                              color: "rgba(255,230,190,0.92)",
                            }}
                          >
                            VIP
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-1 text-[12px] font-semibold text-white/60">
                        {u.city ? <span>{u.city}</span> : <span>Proche de toi</span>}
                        {typeof u.distanceKm === "number" ? (
                          <span className="mx-2 text-white/35">•</span>
                        ) : null}
                        {typeof u.distanceKm === "number" ? (
                          <span>{u.distanceKm.toFixed(1)} km</span>
                        ) : null}
                      </div>
                    </div>

                    <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-white/85">
                      Ouvrir
                    </span>
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProfile(u.id);
                      }}
                      className="w-full rounded-2xl px-4 py-2 text-xs font-black text-[#120A12] active:scale-[0.99]"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(232,162,182,1), rgba(215,178,124,1))",
                      }}
                    >
                      Dire bonjour 👋
                    </button>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* footer CTA */}
        <div className="relative z-[1] mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs font-semibold text-white/60">
            Astuce: autorise la localisation pour des profils plus proches.
          </div>

          <button
            type="button"
            onClick={onDiscoverNearby}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-black text-white/85 hover:bg-white/10"
          >
            📍 Découvrir des profils proches
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlanCulPreview;

/* ---------------------------------- */

const Badge: React.FC<{ label: string; style: React.CSSProperties }> = ({
  label,
  style,
}) => {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-1 text-[10px] font-black"
      style={style}
    >
      {label}
    </span>
  );
};

const css = `
/* rien de bloquant ici, juste du polish si besoin */
`;
