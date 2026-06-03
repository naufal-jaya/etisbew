"use client";
import type { Competition } from "@/types/database";

interface CompetitionCardProps {
  competition: Competition;
}

export default function CompetitionCard({ competition }: CompetitionCardProps) {
  const deadline = new Date(competition.registration_deadline);
  const now = new Date();
  const daysLeft = Math.ceil(
    (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );
  const isUrgent = daysLeft <= 7;

  return (
    <div
      style={{
        background: "#1A2234",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.2s",
        minWidth: "220px",
      }}
      className="comp-card"
    >
      <style>{`.comp-card:hover { border-color: rgba(99,102,241,0.3) !important; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }`}</style>

      {/* Poster */}
      <div
        style={{
          height: "120px",
          background: competition.poster_url
            ? `url(${competition.poster_url}) center/cover no-repeat`
            : "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
        }}
      >
        {!competition.poster_url && "🏆"}
      </div>

      <div style={{ padding: "12px" }}>
        <div style={{ marginBottom: "8px" }}>
          <span
            style={{
              background: "rgba(99,102,241,0.15)",
              color: "#a5b4fc",
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 8px",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {competition.competition_type?.name ?? "Lomba"}
          </span>
        </div>

        <h3
          style={{
            color: "white",
            fontWeight: 700,
            fontSize: "14px",
            margin: "0 0 4px",
            lineHeight: 1.3,
          }}
        >
          {competition.name}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: "12px",
            margin: "0 0 10px",
          }}
        >
          {competition.organizer}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: isUrgent ? "#f87171" : "rgba(255,255,255,0.68)",
              fontFamily: "DM Mono, monospace",
            }}
          >
            {isUrgent && "⚠️ "}
            {daysLeft > 0 ? `${daysLeft}h lagi` : "Tutup"}
          </span>
          {competition.detail_link && (
            <a
              href={competition.detail_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#818cf8",
                fontSize: "11px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Detail →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
