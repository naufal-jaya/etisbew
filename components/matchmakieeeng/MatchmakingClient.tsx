"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { Member, Team, Competition } from "@/types/database";
import { Menu, X } from "lucide-react";
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

  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [competitions, setCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [showForm, setShowForm] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        .eq("member_id", currentUser.id)
        .eq("is_read", false),
    ]);

    setTeams(teamsRes.data ?? []);
    setCompetitions(compsRes.data ?? []);
    setUnreadCount(notifsRes.data?.length ?? 0);
  }, [currentUser.id, supabase]);

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
          filter: `member_id=eq.${currentUser.id}`,
        },
        fetchData,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser.id, fetchData, supabase]);

  const handleAskToJoin = async (teamId: string) => {
    await supabase.from("join_requests").insert({
      team_id: teamId,
      requester_id: currentUser.id,
      status: "pending",
    });
    fetchData();
  };

  const handleCancelRequest = async (teamId: string) => {
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

  // Categorize teams
  const myActiveTeams = teams.filter((t) =>
    t.members?.some(
      (m) => m.member_id === currentUser.id && m.status === "active",
    ),
  );
  const availableTeams = teams.filter(
    (t) =>
      !t.members?.some(
        (m) => m.member_id === currentUser.id && m.status === "active",
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
              <div style={{ color: "rgba(255,255,255,0.72)", fontSize: "13px" }}>
                @{currentUser.username}
              </div>
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
                <div className="pt-4" />
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
                    currentUser={currentUser}
                    isMyTeam={true}
                    onAskToJoin={handleAskToJoin}
                    onCancelRequest={handleCancelRequest}
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
          currentUser={currentUser}
          onClose={() => setShowForm(false)}
          onSuccess={fetchData}
        />
      )}

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
