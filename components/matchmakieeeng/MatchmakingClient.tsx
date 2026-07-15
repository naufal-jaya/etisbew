"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { Member, Team, Competition } from "@/types/database";
import { Menu, X, User, Pencil } from "lucide-react";
import TeamCard from "@/components/matchmakieeeng/TeamCard";
import CompetitionCard from "@/components/matchmakieeeng/CompetitionCard";
import JoinCompetitionForm from "@/components/matchmakieeeng/JoinCompetitionForm";
import NotificationPanel from "@/components/matchmakieeeng/NotificationPanel";
import Link from "next/link";

interface Props {
  currentUser: Member;
  initialTeams: Team[];
  initialCompetitions: Competition[];
  initialUnreadCount: number;
}

export default function MatchmakingClient({
  currentUser,
  initialTeams,
  initialCompetitions,
  initialUnreadCount,
}: Props) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [userState, setUserState] = useState<Member>(currentUser);
  const [showProfile, setShowProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(currentUser.username);
  const [editWhatsapp, setEditWhatsapp] = useState(currentUser.wa_number || "");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [competitions, setCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [showForm, setShowForm] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [confirmJoinTeam, setConfirmJoinTeam] = useState<Team | null>(null);
  const [confirmLeaveTeam, setConfirmLeaveTeam] = useState<Team | null>(null);
  const [confirmDeleteTeam, setConfirmDeleteTeam] = useState<Team | null>(null);
  const [confirmKickMember, setConfirmKickMember] = useState<{team: Team, memberId: string, username: string} | null>(null);

  // Refetch data client-side (for realtime updates)
  const fetchData = useCallback(async () => {
    const [teamsRes, compsRes, notifsRes] = await Promise.all([
      supabase
        .from("teams")
        .select(
          `
          *,
          competition:competitions(*, competition_type:competition_types(*)),
          leader:members!teams_leader_id_fkey(*),
          members:team_members(*, member:members(*)),
          join_requests(*)
        `,
        )
        .order("created_at", { ascending: false }),

      supabase
        .from("competitions")
        .select("*, competition_type:competition_types(*)")
        .eq("is_custom", false)
        .gte("registration_deadline", new Date().toISOString().split("T")[0])
        .order("registration_deadline"),

      supabase
        .from("notifications")
        .select("id")
        .eq("member_id", userState.id)
        .eq("is_read", false),
    ]);

    setTeams(teamsRes.data ?? []);
    setCompetitions(compsRes.data ?? []);
    setUnreadCount(notifsRes.data?.length ?? 0);
  }, [userState.id, supabase]);

  // Realtime subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("matchmaking-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teams" },
        fetchData,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_members" },
        fetchData,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `member_id=eq.${userState.id}`,
        },
        fetchData,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userState.id, fetchData, supabase]);

  const handleAskToJoin = async (teamId: string) => {
    try {
      // Find existing request
      const { data: existingRequests, error: findError } = await supabase
        .from("join_requests")
        .select("id")
        .eq("team_id", teamId)
        .eq("requester_id", userState.id);

      if (findError) throw findError;

      if (existingRequests && existingRequests.length > 0) {
        // If it exists (e.g. rejected), update it back to pending
        const { error: updateError } = await supabase
          .from("join_requests")
          .update({ status: "pending" })
          .eq("id", existingRequests[0].id);

        if (updateError) throw updateError;

        // Insert a new notification for the team leader
        const { data: teamData } = await supabase
          .from("teams")
          .select("leader_id")
          .eq("id", teamId)
          .single();

        if (teamData?.leader_id) {
          await supabase.from("notifications").insert({
            member_id: teamData.leader_id,
            type: "join_request",
            join_request_id: existingRequests[0].id
          });
        }
      } else {
        // Otherwise create a new request
        const { error: insertError } = await supabase.from("join_requests").insert({
          team_id: teamId,
          requester_id: userState.id,
          status: "pending",
        });

        if (insertError) throw insertError;
      }

      fetchData();
    } catch (err: any) {
      alert("Gagal mengirim permintaan: " + (err.message || "Terjadi kesalahan"));
    }
  };

  const handleCancelRequest = async (teamId: string) => {
    await supabase
      .from("join_requests")
      .update({ status: "cancelled" })
      .eq("team_id", teamId)
      .eq("requester_id", userState.id);
    fetchData();
  };

  const handleLeaveTeam = async (teamId: string) => {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("member_id", userState.id);

    if (error) console.error("Error leaving team:", error);
    fetchData();
  };

  const handleKickMember = async (teamId: string, memberId: string) => {
    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("team_id", teamId)
      .eq("member_id", memberId);

    if (error) console.error("Error kicking member:", error);
    fetchData();
  };

  const handleDeleteTeam = async (teamId: string) => {
    try {
      const { error } = await supabase.rpc('delete_team', { target_team_id: teamId });
      if (error) throw error;
      
      fetchData();
    } catch (err: any) {
      alert("Gagal menghapus tim: " + (err.message || "Terjadi kesalahan"));
    }
  };

  const handleUpdateNote = async (teamId: string, note: string) => {
    const { error } = await supabase
      .from("teams")
      .update({ note: note || null })
      .eq("id", teamId);

    if (error) {
      console.error("Error updating team note:", error);
      throw error;
    }
    fetchData();
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUsername.trim()) {
      alert("Username tidak boleh kosong");
      return;
    }
    setUpdatingProfile(true);
    try {
      const { error } = await supabase
        .from("members")
        .update({
          username: editUsername.trim(),
          wa_number: editWhatsapp.trim() || null,
        })
        .eq("id", userState.id);

      if (error) throw error;

      setUserState({
        ...userState,
        username: editUsername.trim(),
        wa_number: editWhatsapp.trim() || null,
      });
      setShowProfile(false);
    } catch (err: any) {
      alert("Gagal memperbarui profil: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/member-login");
  };

  // Categorize teams
  const myActiveTeams = teams.filter((t) =>
    t.members?.some(
      (m) => m.member_id === userState.id && m.status === "active",
    ),
  );
  const availableTeams = teams.filter(
    (t) =>
      !t.members?.some(
        (m) => m.member_id === userState.id && m.status === "active",
      ),
  );

  return (
    <div style={{ minHeight: "100vh", background: "#121820", color: "white" }}>
      <nav
        className="sticky top-0 left-0 right-0 z-50 transition-all duration-500 py-3"
        style={{
          background: "rgba(18,24,32,0.92)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="text-2xl font-bold tracking-tight text-white transition-colors hover:text-white/70">
                IEEE{" "}
                <span className="text-blue-400 group-hover:text-blue-500 transition-colors">
                  IPB
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => {
                  setEditUsername(userState.username);
                  setEditWhatsapp(userState.wa_number || "");
                  setShowProfile(true);
                }}
                style={{
                  background: "none",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <User size={16} strokeWidth={2} style={{ color: "rgba(255,255,255,0.6)" }} />
                <span>@{userState.username}</span>
              </button>
              <button
                onClick={handleLogout}
                style={{
                  background: "#1A2234",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>

            <button
              className="md:hidden p-2 rounded-full transition-colors text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div
              className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl shadow-xl animate-in slide-in-from-top-5"
              style={{
                background: "rgba(26,34,52,0.98)",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="flex flex-col p-4 space-y-2">
                <Link
                  href="/"
                  className="block py-3 px-4 text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setEditUsername(userState.username);
                    setEditWhatsapp(userState.wa_number || "");
                    setShowProfile(true);
                  }}
                  className="w-full text-left flex items-center gap-2 py-3 px-4 text-slate-200 hover:bg-white/10 hover:text-white rounded-lg transition-colors font-medium"
                  style={{ background: "transparent", border: "none" }}
                >
                  <User size={16} style={{ color: "rgba(255,255,255,0.6)" }} />
                  <span>@{userState.username} (Profil)</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left py-3 px-4 text-red-400 hover:bg-white/10 rounded-lg transition-colors font-medium"
                  style={{ background: "transparent", border: "none" }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "32px",
        }}
      >
        {/* LEFT: Teams */}
        <div>
          {/* My Teams */}
          <div style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ color: "white", fontWeight: 700, fontSize: "20px" }}>
                My Teams
              </h2>
              <button
                onClick={() => setShowNotifs(true)}
                style={{
                  position: "relative",
                  background: "#1A2234",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                🔔
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      background: "#ef4444",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 700,
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.24), rgba(139,92,246,0.24))",
                  border: "1px solid rgba(99,102,241,0.36)",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  color: "#c7d2fe",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                + Join Competition
              </button>
            </div>

            {myActiveTeams.length === 0 ? (
              <div
                style={{
                  background: "#1A2234",
                  border: "1px dashed rgba(255,255,255,0.14)",
                  borderRadius: "16px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🏁</div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: "14px",
                    marginBottom: "16px",
                  }}
                >
                  Kamu belum di tim manapun
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))",
                    border: "1px solid rgba(99,102,241,0.3)",
                    borderRadius: "10px",
                    padding: "8px 20px",
                    color: "#a5b4fc",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  + Join a Competition
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "14px",
                }}
              >
                {myActiveTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    currentUser={userState}
                    isMyTeam={true}
                    onAskToJoin={(t) => setConfirmJoinTeam(teams.find((x) => x.id === t) || null)}
                    onCancelRequest={handleCancelRequest}
                    onLeaveTeam={(t) => setConfirmLeaveTeam(teams.find((x) => x.id === t) || null)}
                    onDeleteTeam={(t) => setConfirmDeleteTeam(teams.find((x) => x.id === t) || null)}
                    onKickMember={(t, mId, uName) => setConfirmKickMember({team: teams.find((x) => x.id === t)!, memberId: mId, username: uName})}
                    onUpdateNote={handleUpdateNote}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Available Teams */}
          <div>
            <h2
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              Available Teams
              <span
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 400,
                  fontSize: "14px",
                  marginLeft: "10px",
                }}
              >
                {availableTeams.length} tim
              </span>
            </h2>

            {availableTeams.length === 0 ? (
              <div
                style={{
                  background: "#1A2234",
                  border: "1px dashed rgba(255,255,255,0.14)",
                  borderRadius: "16px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "14px" }}>
                  Belum ada tim yang tersedia
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "14px",
                }}
              >
                {availableTeams.map((team) => {
                  const isPending = (team as any).join_requests?.some((jr: any) => jr.requester_id === userState.id && jr.status === 'pending');

                  return (
                    <TeamCard
                      key={team.id}
                      team={team}
                      currentUser={userState}
                      isPending={isPending}
                      onAskToJoin={(t) => setConfirmJoinTeam(teams.find((x) => x.id === t) || null)}
                      onCancelRequest={handleCancelRequest}
                      onLeaveTeam={(t) => setConfirmLeaveTeam(teams.find((x) => x.id === t) || null)}
                      onDeleteTeam={(t) => setConfirmDeleteTeam(teams.find((x) => x.id === t) || null)}
                      onKickMember={(t, mId, uName) => setConfirmKickMember({team: teams.find((x) => x.id === t)!, memberId: mId, username: uName})}
                      onUpdateNote={handleUpdateNote}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Competitions */}
        <div>
          <div style={{ position: "sticky", top: "80px" }}>
            <h2
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "20px",
                marginBottom: "20px",
              }}
            >
              Lomba Aktif 🏆
            </h2>

            {competitions.length === 0 ? (
              <div
                style={{
                  background: "#1A2234",
                  border: "1px dashed rgba(255,255,255,0.14)",
                  borderRadius: "16px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "13px" }}>
                  Belum ada lomba aktif
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {competitions.slice(0, 8).map((comp) => (
                  <CompetitionCard key={comp.id} competition={comp} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <JoinCompetitionForm
          currentUser={userState}
          onClose={() => setShowForm(false)}
          onSuccess={fetchData}
        />
      )}

      {showNotifs && (
        <NotificationPanel
          currentUser={userState}
          onClose={() => {
            setShowNotifs(false);
            fetchData();
          }}
        />
      )}

      {/* Confirm Join Modal */}
      {confirmJoinTeam && (
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
          onClick={() => setConfirmJoinTeam(null)}
        >
          <div
            style={{
              background: "#1A2234",
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
              style={{ color: "white", fontWeight: 700, marginBottom: "8px" }}
            >
              Yakin mau join?
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "14px",
                marginBottom: "24px",
                lineHeight: 1.5,
              }}
            >
              Kamu akan kirim permintaan ke{" "}
              <strong style={{ color: "#a5b4fc" }}>
                {confirmJoinTeam.leader?.username}
              </strong>{" "}
              untuk join tim{" "}
              <strong style={{ color: "white" }}>{confirmJoinTeam.name}</strong>.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setConfirmJoinTeam(null)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleAskToJoin(confirmJoinTeam.id);
                  setConfirmJoinTeam(null);
                }}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Kirim Permintaan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Leave Team Modal */}
      {confirmLeaveTeam && (
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
          onClick={() => setConfirmLeaveTeam(null)}
        >
          <div
            style={{
              background: "#1A2234",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "360px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🚪</div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "8px" }}>
              Keluar dari Tim?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", marginBottom: "24px", lineHeight: 1.5 }}>
              Yakin mau keluar dari tim <strong style={{ color: "white" }}>{confirmLeaveTeam.name}</strong>?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setConfirmLeaveTeam(null)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleLeaveTeam(confirmLeaveTeam.id);
                  setConfirmLeaveTeam(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "#fca5a5",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Team Modal */}
      {confirmDeleteTeam && (
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
          onClick={() => setConfirmDeleteTeam(null)}
        >
          <div
            style={{
              background: "#1A2234",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "360px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗑️</div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "8px" }}>
              Hapus Tim?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", marginBottom: "24px", lineHeight: 1.5 }}>
              Yakin mau menghapus tim <strong style={{ color: "white" }}>{confirmDeleteTeam.name}</strong> secara permanen? Aksi ini tidak bisa dibatalkan!
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setConfirmDeleteTeam(null)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleDeleteTeam(confirmDeleteTeam.id);
                  setConfirmDeleteTeam(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "#fca5a5",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Kick Member Modal */}
      {confirmKickMember && (
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
          onClick={() => setConfirmKickMember(null)}
        >
          <div
            style={{
              background: "#1A2234",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "360px",
              width: "90%",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>👟</div>
            <h3 style={{ color: "white", fontWeight: 700, marginBottom: "8px" }}>
              Keluarkan Anggota?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "14px", marginBottom: "24px", lineHeight: 1.5 }}>
              Yakin mau mengeluarkan <strong style={{ color: "#fca5a5" }}>{confirmKickMember.username}</strong> dari tim <strong style={{ color: "white" }}>{confirmKickMember.team.name}</strong>?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setConfirmKickMember(null)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleKickMember(confirmKickMember.team.id, confirmKickMember.memberId);
                  setConfirmKickMember(null);
                }}
                style={{
                  flex: 1,
                  background: "rgba(239,68,68,0.15)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "#fca5a5",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Ya, Keluarkan
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setShowProfile(false)}
        >
          <div
            style={{
              background: "#1A2234",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "32px",
              maxWidth: "400px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.1)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <User size={32} style={{ color: "#818cf8" }} />
              </div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: "18px", margin: "0 0 4px" }}>
                {userState.real_name || "Nama Lengkap"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0 }}>
                @{userState.username}
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={userState.real_name || ""}
                  disabled
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "14px",
                    cursor: "not-allowed",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                  Username
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      padding: "10px 40px 10px 14px",
                      color: "white",
                      fontSize: "14px",
                    }}
                  />
                  <Pencil size={14} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: "6px" }}>
                  Nomor WhatsApp
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Contoh: 08123456789"
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      padding: "10px 40px 10px 14px",
                      color: "white",
                      fontSize: "14px",
                    }}
                  />
                  <Pencil size={14} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowProfile(false)}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "10px",
                    color: "rgba(255,255,255,0.78)",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={updatingProfile}
                  style={{
                    flex: 1,
                    background: updatingProfile ? "rgba(99,102,241,0.5)" : "rgb(99, 102, 241)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px",
                    color: "white",
                    cursor: updatingProfile ? "not-allowed" : "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  {updatingProfile ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
