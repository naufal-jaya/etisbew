"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Member, Team, Competition, Notification } from "@/types/database";
import TeamCard from "@/components/matchmakieeeng/TeamCard";
import CompetitionCard from "@/components/matchmakieeeng/CompetitionCard";
import JoinCompetitionForm from "@/components/matchmakieeeng/JoinCompetitionForm";
import NotificationPanel from "@/components/matchmakieeeng/NotificationPanel";

export default function MatchmakingPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/member-login");
      return;
    }

    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!member) {
      router.push("/member-login");
      return;
    }
    setCurrentUser(member);
    fetchData(member.id);
  };

  const fetchData = useCallback(
    async (userId?: string) => {
      const uid = userId ?? currentUser?.id;
      if (!uid) return;

      const [teamsRes, compsRes, notifsRes] = await Promise.all([
        supabase
          .from("teams")
          .select(
            `
        *,
        competition:competitions(*, competition_type:competition_types(*)),
        leader:members!teams_leader_id_fkey(*),
        members:team_members(*, member:members(*), role:member_roles(*)),
        needed_roles:team_needed_roles(*, role:member_roles(*))
      `,
          )
          .order("created_at", { ascending: false }),

        supabase
          .from("competitions")
          .select("*, competition_type:competition_types(*)")
          .gte("registration_deadline", new Date().toISOString().split("T")[0])
          .order("registration_deadline"),

        supabase
          .from("notifications")
          .select("id")
          .eq("member_id", uid)
          .eq("is_read", false),
      ]);

      setTeams(teamsRes.data ?? []);
      setCompetitions(compsRes.data ?? []);
      setUnreadCount(notifsRes.data?.length ?? 0);
      setLoading(false);
    },
    [currentUser?.id],
  );

  // Realtime subscription
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase
      .channel("matchmaking-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "teams" },
        () => fetchData(),
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "team_members" },
        () => fetchData(),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `member_id=eq.${currentUser.id}`,
        },
        () => fetchData(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, fetchData]);

  const handleAskToJoin = async (teamId: string) => {
    if (!currentUser) return;
    await supabase.from("join_requests").insert({
      team_id: teamId,
      requester_id: currentUser.id,
      status: "pending",
    });
    fetchData();
  };

  const handleCancelRequest = async (teamId: string) => {
    if (!currentUser) return;
    await supabase
      .from("join_requests")
      .update({ status: "cancelled" })
      .eq("team_id", teamId)
      .eq("requester_id", currentUser.id);
    fetchData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/member-login");
  };

  if (!currentUser || loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
          Memuat...
        </div>
      </div>
    );
  }

  // Categorize teams
  const myActiveTeams = teams.filter((t) =>
    t.members?.some(
      (m) => m.member_id === currentUser.id && m.status === "active",
    ),
  );
  const myPendingTeams = teams.filter((t) => {
    // Teams where user has pending join request but not active member
    const isActiveMember = t.members?.some(
      (m) => m.member_id === currentUser.id && m.status === "active",
    );
    return !isActiveMember; // We'll check join_requests separately - simplified here
  });
  const availableTeams = teams.filter(
    (t) =>
      !t.members?.some(
        (m) => m.member_id === currentUser.id && m.status === "active",
      ),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f1a",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:ital,wght@0,400;0,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 100px; }
        input, select, button { font-family: 'Space Grotesk', sans-serif; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(15,15,26,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>⚡</span>
          <span style={{ color: "white", fontWeight: 700, fontSize: "16px" }}>
            Matchmaking
          </span>
          <span
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#a5b4fc",
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "100px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            IPB
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              border: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            + Join a Competition
          </button>

          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
            @{currentUser.username}
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "6px 12px",
              color: "rgba(255,255,255,0.4)",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
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
          {/* My Teams section */}
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
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
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
            </div>

            {myActiveTeams.length === 0 ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🏁</div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.35)",
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
                    currentUser={currentUser}
                    isMyTeam={true}
                    onAskToJoin={handleAskToJoin}
                    onCancelRequest={handleCancelRequest}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Available Teams section */}
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
                  color: "rgba(255,255,255,0.25)",
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
                  background: "rgba(255,255,255,0.02)",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
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
                {availableTeams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    currentUser={currentUser}
                    onAskToJoin={handleAskToJoin}
                    onCancelRequest={handleCancelRequest}
                  />
                ))}
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
                  background: "rgba(255,255,255,0.02)",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
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

      {/* Form overlay */}
      {showForm && (
        <JoinCompetitionForm
          currentUser={currentUser}
          onClose={() => setShowForm(false)}
          onSuccess={() => fetchData()}
        />
      )}

      {/* Notification panel */}
      {showNotifs && (
        <NotificationPanel
          currentUser={currentUser}
          onClose={() => {
            setShowNotifs(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
