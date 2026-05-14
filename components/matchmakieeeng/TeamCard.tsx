"use client";
import { useState } from "react";
import type { Team, Member } from "@/types/database";

interface TeamCardProps {
  team: Team;
  currentUser: Member;
  isMyTeam?: boolean;
  isPending?: boolean;
  onAskToJoin?: (teamId: string) => void;
  onCancelRequest?: (teamId: string) => void;
}

export default function TeamCard({
  team,
  currentUser,
  isMyTeam,
  isPending,
  onAskToJoin,
  onCancelRequest,
}: TeamCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const maxMembers = team.competition?.max_members ?? 3;
  const currentCount =
    team.members?.filter((m) => m.status === "active").length ?? 0;
  const isLeader = team.leader_id === currentUser.id;
  const isMember = team.members?.some(
    (m) => m.member_id === currentUser.id && m.status === "active",
  );

  const waLink = team.leader?.wa_number
    ? `https://wa.me/${team.leader.wa_number.replace(/\D/g, "")}?text=${encodeURIComponent(`Halo ${team.leader.real_name}, aku mau join tim kamu "${team.name}" untuk lomba ${team.competition?.name}!`)}`
    : null;

  const handleConfirmJoin = () => {
    if (waLink) window.open(waLink, "_blank");
    onAskToJoin?.(team.id);
    setShowConfirm(false);
  };

  return (
    <div
      style={{
        background: isMyTeam
          ? "rgba(99,102,241,0.08)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${isMyTeam ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "16px",
        position: "relative",
        transition: "all 0.2s",
      }}
      className="team-card"
    >
      <style>{`
        .team-card:hover { border-color: rgba(99,102,241,0.3) !important; transform: translateY(-1px); }
        .username-tooltip { position: relative; display: inline-block; }
        .username-tooltip .tooltip {
          visibility: hidden;
          opacity: 0;
          background: rgba(15,15,26,0.95);
          border: 1px solid rgba(99,102,241,0.3);
          color: white  ;
          border-radius: 8px;
          padding: 4px 10px;
          font-size: 12px;
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          transition: all 0.15s;
          z-index: 10;
        }
        .username-tooltip:hover .tooltip,
        .username-tooltip:focus .tooltip { visibility: visible; opacity: 1; }
        @media (max-width: 768px) {
          .username-tooltip .tooltip { bottom: auto; top: 120%; }
          .username-tooltip:active .tooltip { visibility: visible; opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "12px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h3
              style={{
                color: "black",
                fontWeight: 600,
                fontSize: "15px",
                margin: 0,
              }}
            >
              {team.name}
            </h3>
            {isLeader && (
              <span
                style={{
                  background: "rgba(251,191,36,0.15)",
                  border: "1px solid rgba(251,191,36,0.3)",
                  color: "#fbbf24",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "100px",
                  letterSpacing: "0.5px",
                }}
              >
                KETUA
              </span>
            )}
            {isPending && (
              <span
                style={{
                  background: "rgba(234,179,8,0.15)",
                  border: "1px solid rgba(234,179,8,0.3)",
                  color: "#eab308",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "100px",
                }}
              >
                PENDING
              </span>
            )}
          </div>
          <p
            style={{
              color: "rgba(0, 0, 0, 0.77)",
              fontSize: "12px",
              margin: "2px 0 0",
            }}
          >
            {team.competition?.name}
          </p>
        </div>

        {/* Member count */}
        <div
          style={{
            background:
              currentCount >= maxMembers
                ? "rgba(239,68,68,0.15)"
                : "rgba(34,197,94,0.12)",
            border: `1px solid ${currentCount >= maxMembers ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.25)"}`,
            borderRadius: "100px",
            padding: "3px 10px",
            fontSize: "12px",
            fontWeight: 700,
            color: currentCount >= maxMembers ? "#f87171" : "#4ade80",
            fontFamily: "DM Mono, monospace",
            whiteSpace: "nowrap",
          }}
        >
          {currentCount}/{maxMembers}
        </div>
      </div>

      {/* Members */}
      <div style={{ marginBottom: "12px" }}>
        <p
          style={{
            color: "rgba(0, 0, 0, 0.77)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginBottom: "6px",
          }}
        >
          Anggota
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {team.members
            ?.filter((m) => m.status === "active")
            .map((m) => (
              <span
                key={m.id}
                className="username-tooltip"
                tabIndex={0}
                style={{
                  background:
                    m.member_id === team.leader_id
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.07)",
                  border: `1px solid ${m.member_id === team.leader_id ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "8px",
                  padding: "3px 10px",
                  fontSize: "12px",
                  color:
                    m.member_id === team.leader_id
                      ? "#a5b4fc"
                      : "rgba(255,255,255,0.7)",
                  cursor: "default",
                  userSelect: "none",
                }}
              >
                {m.member?.username ?? "unknown"}
                {m.member_id === team.leader_id && " 👑"}
                <span className="tooltip">{m.member?.real_name ?? "-"}</span>
              </span>
            ))}
        </div>
      </div>

      {/* Needed roles */}
      {team.needed_roles && team.needed_roles.length > 0 && (
        <div style={{ marginBottom: "12px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "6px",
            }}
          >
            Butuh
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
            {team.needed_roles.map((nr) => (
              <span
                key={nr.id}
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                  fontSize: "11px",
                  color: "#c4b5fd",
                }}
              >
                {nr.role?.name} ×{nr.count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      {!isMyTeam && !isMember && !isPending && currentCount < maxMembers && (
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: "10px",
            padding: "8px",
            color: "#a5b4fc",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.35))")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))")
          }
        >
          Ask to Join →
        </button>
      )}

      {isPending && (
        <button
          onClick={() => onCancelRequest?.(team.id)}
          style={{
            width: "100%",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "10px",
            padding: "8px",
            color: "#fca5a5",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Batalkan Pengajuan
        </button>
      )}

      {/* Confirm popup */}
      {showConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setShowConfirm(false)}
        >
          <div
            style={{
              background: "#1a1a2e",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "360px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🤝</div>
            <h3
              style={{ color: "black", fontWeight: 700, marginBottom: "8px" }}
            >
              Yakin mau join?
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: 1.5,
              }}
            >
              Kamu akan kirim permintaan ke{" "}
              <strong style={{ color: "#a5b4fc" }}>
                {team.leader?.username}
              </strong>{" "}
              untuk join tim{" "}
              <strong style={{ color: "black" }}>{team.name}</strong>. Link WA
              akan dibuka otomatis.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmJoin}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "black",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Kirim & Buka WA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
