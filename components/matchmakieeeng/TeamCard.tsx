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
  onLeaveTeam?: (teamId: string) => void;
  onDeleteTeam?: (teamId: string) => void;
  onKickMember?: (teamId: string, memberId: string, username: string) => void;
  onUpdateNote?: (teamId: string, note: string) => Promise<void>;
}

export default function TeamCard({
  team,
  currentUser,
  isMyTeam,
  isPending,
  onAskToJoin,
  onCancelRequest,
  onLeaveTeam,
  onDeleteTeam,
  onKickMember,
  onUpdateNote,
}: TeamCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState(team.note || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveNote = async () => {
    if (!onUpdateNote) return;
    setIsSaving(true);
    try {
      await onUpdateNote(team.id, tempNote);
      setIsEditingNote(false);
    } catch (err: any) {
      alert("Gagal menyimpan catatan: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setIsSaving(false);
    }
  };
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

  return (
    <div
      style={{
        background: isMyTeam
          ? "linear-gradient(135deg, rgba(99,102,241,0.18), #1A2234)"
          : "#1A2234",
        border: `1px solid ${isMyTeam ? "rgba(99,102,241,0.32)" : "rgba(255,255,255,0.1)"}`,
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
          background: rgba(18,24,32,0.98);
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
                color: "white",
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
              color: "rgba(255,255,255,0.68)",
              fontSize: "12px",
              margin: "2px 0 0",
            }}
          >
            {team.competition?.name}
          </p>
        </div>

        {/* Member count & Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

          {(isLeader || (isMember && !isLeader)) && (
            <div style={{ position: "relative" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ⋮
              </button>

              {showMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div 
                    style={{ position: "fixed", inset: 0, zIndex: 9 }} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
                    }} 
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      background: "#1A2234",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      padding: "4px",
                      marginTop: "4px",
                      minWidth: "120px",
                      zIndex: 10,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    }}
                  >
                    {isLeader && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onDeleteTeam?.(team.id);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: "transparent",
                          border: "none",
                          color: "#fca5a5",
                          padding: "8px 12px",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        Hapus Tim
                      </button>
                    )}
                    {isMember && !isLeader && (
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onLeaveTeam?.(team.id);
                        }}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          background: "transparent",
                          border: "none",
                          color: "#fca5a5",
                          padding: "8px 12px",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        Keluar Tim
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Members */}
      <div style={{ marginBottom: "12px" }}>
        <p
          style={{
            color: "rgba(255,255,255,0.62)",
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
              <div
                key={m.id}
                className="username-tooltip"
                tabIndex={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background:
                    m.member_id === team.leader_id
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.08)",
                  border: `1px solid ${m.member_id === team.leader_id ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: "8px",
                  padding: "3px 10px",
                  fontSize: "12px",
                  color:
                    m.member_id === team.leader_id
                      ? "#a5b4fc"
                      : "rgba(255,255,255,0.78)",
                  cursor: "default",
                  userSelect: "none",
                }}
              >
                {m.member?.username ?? "unknown"}
                {m.member_id === team.leader_id && " 👑"}
                {isLeader && m.member_id !== team.leader_id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onKickMember?.(team.id, m.member_id, m.member?.username ?? "unknown");
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: "0 2px",
                      marginLeft: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fca5a5")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    ×
                  </button>
                )}
                <span className="tooltip">{m.member?.real_name ?? "-"}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Team Note */}
      {(team.note || isLeader) && (
        <div style={{ marginBottom: "12px" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "6px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Catatan Tim</span>
            {isLeader && (
              <button
                onClick={() => {
                  setTempNote(team.note || "");
                  setIsEditingNote(!isEditingNote);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#a5b4fc",
                  fontSize: "11px",
                  cursor: "pointer",
                  padding: "0 4px",
                }}
              >
                {team.note ? "Edit" : "+ Tambah"}
              </button>
            )}
          </p>
          {isEditingNote ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <textarea
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                placeholder="Tulis catatan tim (misal: butuh UI/UX designer, target juara)..."
                maxLength={200}
                rows={2}
                style={{
                  width: "100%",
                  background: "#121820",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white",
                  fontSize: "12px",
                  resize: "none",
                  outline: "none",
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>
                  {tempNote.length}/200
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    onClick={() => {
                      setIsEditingNote(false);
                      setTempNote(team.note || "");
                    }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      padding: "3px 8px",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSaveNote}
                    disabled={isSaving}
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      border: "none",
                      borderRadius: "6px",
                      padding: "3px 10px",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {isSaving ? "Simpan..." : "Simpan"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                color: team.note ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.44)",
                fontStyle: team.note ? "normal" : "italic",
                lineHeight: "1.4",
                whiteSpace: "pre-wrap",
              }}
            >
              {team.note || "Belum ada catatan tim."}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {!isMyTeam && !isMember && !isPending && currentCount < maxMembers && (
        <button
          onClick={() => onAskToJoin?.(team.id)}
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
        <div style={{ display: "flex", gap: "8px", width: "100%" }}>
          <button
            onClick={() => onCancelRequest?.(team.id)}
            style={{
              flex: 1,
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
            Cancel Request
          </button>
          {waLink && (
            <button
              onClick={() => window.open(waLink, "_blank")}
              style={{
                flex: 1,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "10px",
                padding: "8px",
                color: "#4ade80",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              WhatsApp
            </button>
          )}
        </div>
      )}
    </div>
  );
}
