"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Notification, Member } from "@/types/database";

interface NotificationPanelProps {
  currentUser: Member;
  onClose: () => void;
}

export default function NotificationPanel({
  currentUser,
  onClose,
}: NotificationPanelProps) {
  const supabase = createClient();
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [teamInvites, setTeamInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifs();
  }, []);

  const fetchNotifs = async () => {
    const [notifsRes, invitesRes] = await Promise.all([
      supabase
        .from("notifications")
        .select(
          `
          *,
          join_request:join_requests(
            *,
            requester:members(*),
            team:teams(*, competition:competitions(*))
          )
        `,
        )
        .eq("member_id", currentUser.id)
        .order("created_at", { ascending: false })
        .limit(20),

      supabase
        .from("team_members")
        .select(
          `
          *,
          team:teams(*, leader:members(*), competition:competitions(*))
          `
        )
        .eq("member_id", currentUser.id)
        .eq("status", "pending")
    ]);

    setNotifs(notifsRes.data ?? []);
    setTeamInvites(invitesRes.data ?? []);
    setLoading(false);

    // Mark all as read
    await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("member_id", currentUser.id)
      .eq("is_read", false);
  };

  const handleAccept = async (joinRequestId: string) => {
    await supabase
      .from("join_requests")
      .update({ status: "accepted" })
      .eq("id", joinRequestId);
    fetchNotifs();
  };

  const handleReject = async (joinRequestId: string) => {
    await supabase
      .from("join_requests")
      .update({ status: "rejected" })
      .eq("id", joinRequestId);
    fetchNotifs();
  };

  const handleAcceptInvite = async (teamMemberId: string) => {
    await supabase.from("team_members").update({ status: "active" }).eq("id", teamMemberId);
    fetchNotifs();
  };

  const handleRejectInvite = async (teamMemberId: string) => {
    await supabase.from("team_members").delete().eq("id", teamMemberId);
    fetchNotifs();
  };

  const typeLabel: Record<string, string> = {
    join_request: "Minta Join",
    request_accepted: "Diterima ✅",
    request_rejected: "Ditolak ❌",
    team_deleted: "Tim Dihapus ⚠️",
    member_left: "Anggota Keluar 🚪",
  };

  // Find latest join request notification IDs to prevent old ones from acting active
  const latestJoinRequestIds = new Set<string>();
  const latestNotifIds = new Set<string>();

  notifs.forEach((n) => {
    if (n.type === "join_request" && n.join_request_id) {
      if (!latestJoinRequestIds.has(n.join_request_id)) {
        latestJoinRequestIds.add(n.join_request_id);
        latestNotifIds.add(n.id);
      }
    }
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "360px",
          maxWidth: "100vw",
          height: "100vh",
          background: "#121820",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          padding: "24px",
          overflowY: "auto",
          animation: "slideIn 0.25s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        `}</style>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
              margin: 0,
            }}
          >
            🔔 Notifikasi
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.72)",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>

        {loading ? (
          <div
            style={{
              color: "rgba(255,255,255,0.68)",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Memuat...
          </div>
        ) : notifs.length === 0 && teamInvites.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
            <p style={{ color: "rgba(255,255,255,0.68)" }}>
              Belum ada notifikasi
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {teamInvites.map((invite) => (
              <div
                key={invite.id}
                style={{
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.24)",
                  borderRadius: "14px",
                  padding: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#fbbf24",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Undangan Tim
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "11px",
                      fontFamily: "DM Mono, monospace",
                    }}
                  >
                    {new Date(invite.joined_at || invite.created_at || new Date()).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>

                <p
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "13px",
                    margin: "0 0 10px",
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: "#a5b4fc" }}>
                    {invite.team?.leader?.username || "Seseorang"}
                  </strong>{" "}
                  mengundangmu untuk bergabung ke tim{" "}
                  <strong style={{ color: "white" }}>
                    {invite.team?.name}
                  </strong>
                </p>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleAcceptInvite(invite.id)}
                    style={{
                      flex: 1,
                      background: "rgba(34,197,94,0.15)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: "8px",
                      padding: "7px",
                      color: "#4ade80",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ✓ Terima
                  </button>
                  <button
                    onClick={() => handleRejectInvite(invite.id)}
                    style={{
                      flex: 1,
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "8px",
                      padding: "7px",
                      color: "#fca5a5",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    ✕ Tolak
                  </button>
                </div>
              </div>
            ))}
            {notifs.map((n) => {
                const req = n.join_request as any;
                const isLatest = latestNotifIds.has(n.id);
                const isPending = req?.status === "pending" && isLatest;
                const isJoinRequest = n.type === "join_request";

                return (
                  <div
                    key={n.id}
                    style={{
                      background: n.is_read
                        ? "#1A2234"
                        : "rgba(99,102,241,0.08)",
                      border: `1px solid ${n.is_read ? "rgba(255,255,255,0.1)" : "rgba(99,102,241,0.24)"}`,
                      borderRadius: "14px",
                      padding: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: isJoinRequest
                            ? "#fbbf24"
                            : n.type === "request_accepted"
                              ? "#4ade80"
                              : "#f87171",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {typeLabel[n.type]}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.55)",
                          fontSize: "11px",
                          fontFamily: "DM Mono, monospace",
                        }}
                      >
                        {new Date(n.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>

                    {isJoinRequest && req && (
                      <>
                        <p
                          style={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: "13px",
                            margin: "0 0 10px",
                            lineHeight: 1.5,
                          }}
                        >
                          <strong style={{ color: "#a5b4fc" }}>
                            {req.requester?.username}
                          </strong>{" "}
                          ({req.requester?.real_name}) minta join tim{" "}
                          <strong style={{ color: "white" }}>
                            {n.team_name || req.team?.name || "[Tim Telah Dihapus]"}
                          </strong>
                        </p>
                        {isPending && (
                          <div style={{ display: "flex", gap: "8px" }}>
                            <button
                              onClick={() => handleAccept(req.id)}
                              style={{
                                flex: 1,
                                background: "rgba(34,197,94,0.15)",
                                border: "1px solid rgba(34,197,94,0.3)",
                                borderRadius: "8px",
                                padding: "7px",
                                color: "#4ade80",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              ✓ Terima
                            </button>
                            <button
                              onClick={() => handleReject(req.id)}
                              style={{
                                flex: 1,
                                background: "rgba(239,68,68,0.1)",
                                border: "1px solid rgba(239,68,68,0.25)",
                                borderRadius: "8px",
                                padding: "7px",
                                color: "#fca5a5",
                                fontSize: "12px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              ✕ Tolak
                            </button>
                          </div>
                        )}
                        {!isPending && (
                          <span
                            style={{
                              fontSize: "12px",
                              color:
                                req.status === "accepted" && isLatest ? "#4ade80" : "#f87171",
                            }}
                          >
                            {req.status === "accepted" && isLatest
                              ? "Sudah diterima"
                              : "Sudah ditolak"}
                          </span>
                        )}
                      </>
                    )}

                    {(n.type === "request_accepted" || n.type === "request_rejected") && (
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "13px",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        Permintaan join tim{" "}
                        <strong style={{ color: "white" }}>
                          {n.team_name || req?.team?.name || "[Tim Telah Dihapus]"}
                        </strong>{" "}
                        {n.type === "request_accepted" ? "diterima!" : "ditolak."}
                      </p>
                    )}

                    {n.type === "team_deleted" && (
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "13px",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        Tim <strong style={{ color: "white" }}>{n.team_name}</strong> telah dihapus oleh ketua tim.
                      </p>
                    )}

                    {n.type === "member_left" && (
                      <p
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          fontSize: "13px",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        <strong style={{ color: "#a5b4fc" }}>{n.actor_name}</strong> telah keluar dari tim <strong style={{ color: "white" }}>{n.team_name}</strong>.
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
