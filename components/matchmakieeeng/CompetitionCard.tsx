"use client";
import type { Competition } from "@/types/database";
import { Award, Users, AlertTriangle } from "lucide-react";

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
        background: "#1E2638",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "all 0.2s",
        minWidth: "220px",
      }}
      className="comp-card"
    >
      <style>{`.comp-card:hover { border-color: #16357B !important; }`}</style>

      {/* Poster */}
      <div
        style={{
          height: "120px",
          background: competition.poster_url
            ? `url(${competition.poster_url}) center/cover no-repeat`
            : "rgba(22, 53, 123, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!competition.poster_url && <Award size={36} style={{ color: "#93c5fd", opacity: 0.8 }} />}
      </div>

      <div style={{ padding: "12px" }}>
        <div style={{ marginBottom: "8px" }}>
          <span
            style={{
              background: "rgba(22,53,123,0.4)",
              color: "#93c5fd",
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
            flexDirection: "column",
            gap: "6px",
            marginBottom: "10px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "8px",
          }}
        >
          {competition.max_members && (
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.55)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Users size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
              <span>
                {(() => {
                  const min = competition.min_members ?? 1;
                  const max = competition.max_members;
                  if (min === max) return `${max} Anggota`;
                  return `${min} - ${max} Anggota`;
                })()}
              </span>
            </div>
          )}
        </div>

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
              color: isUrgent ? "#f87171" : "rgba(255,255,255,0.55)",
              fontFamily: "DM Mono, monospace",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {isUrgent && <AlertTriangle size={12} style={{ color: "#f87171" }} />}
            <span>{daysLeft > 0 ? `${daysLeft} hari lagi` : "Tutup"}</span>
          </span>
          {competition.detail_link && (
            <a
              href={competition.detail_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#93c5fd",
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
