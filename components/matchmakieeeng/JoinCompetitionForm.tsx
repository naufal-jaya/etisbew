"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import type {
  Competition,
  CompetitionType,
  Member,
} from "@/types/database";

interface JoinCompetitionFormProps {
  currentUser: Member;
  onClose: () => void;
  onSuccess: () => void;
}

export default function JoinCompetitionForm({
  currentUser,
  onClose,
  onSuccess,
}: JoinCompetitionFormProps) {
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [compTypes, setCompTypes] = useState<CompetitionType[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [isCustomComp, setIsCustomComp] = useState(false);
  const [customComp, setCustomComp] = useState({
    name: "",
    organizer: "",
    deadline: "",
    maxMembers: "3",
  });
  const [selectedCompType, setSelectedCompType] = useState("");
  const [customCompType, setCustomCompType] = useState("");
  const [teamName, setTeamName] = useState("");
  const [maxMembers, setMaxMembers] = useState("3");
  const [hasTeam, setHasTeam] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [teamNote, setTeamNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    fetchData();
  }, []);

  const fetchData = async () => {
    const [compsRes, typesRes, membersRes] = await Promise.all([
      supabase
        .from("competitions")
        .select("*, competition_type:competition_types(*)")
        .order("name"),
      supabase.from("competition_types").select("*").order("name"),
      supabase.from("members").select("*").order("username"),
    ]);
    setCompetitions(compsRes.data ?? []);
    setCompTypes(typesRes.data ?? []);
    setMembers((membersRes.data ?? []).filter((m) => m.id !== currentUser.id));
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const filteredMembers = members.filter(
    (m) =>
      memberSearch &&
      (m.username.toLowerCase().includes(memberSearch.toLowerCase()) ||
        m.real_name.toLowerCase().includes(memberSearch.toLowerCase())),
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      let competitionId = selectedComp?.id;

      // Create custom competition if needed
      if (isCustomComp) {
        let typeId = selectedCompType;
        if (customCompType) {
          const { data: newType } = await supabase
            .from("competition_types")
            .insert({ name: customCompType })
            .select()
            .single();
          typeId = newType?.id;
        }

        const { data: newComp } = await supabase
          .from("competitions")
          .insert({
            name: customComp.name,
            organizer: customComp.organizer,
            registration_deadline: customComp.deadline,
            max_members: parseInt(customComp.maxMembers),
            competition_type_id: typeId,
            is_custom: true,
            created_by: currentUser.id,
          })
          .select()
          .single();
        competitionId = newComp?.id;
      }

      // Create team
      const { data: team } = await supabase
        .from("teams")
        .insert({
          name: teamName,
          competition_id: competitionId,
          leader_id: currentUser.id,
          note: teamNote || null,
        })
        .select()
        .single();

      if (!team) throw new Error("Gagal membuat tim");

      // Add leader as member
      await supabase.from("team_members").insert({
        team_id: team.id,
        member_id: currentUser.id,
        status: "active",
      });

      // Add other members
      if (hasTeam && selectedMembers.length > 0) {
        const memberInserts = selectedMembers.map((m) => ({
          team_id: team.id,
          member_id: m.id,
          status: "pending" as const,
        }));
        const { data: insertedMembers, error: memberError } = await supabase
          .from("team_members")
          .insert(memberInserts)
          .select();

        if (memberError) throw memberError;

        if (insertedMembers && insertedMembers.length > 0) {
          const leaderName = currentUser.real_name || currentUser.username;
          const notificationInserts = insertedMembers.map((tm) => ({
            member_id: tm.member_id,
            team_member_id: tm.id,
            type: "team_invite",
            team_name: teamName,
            actor_name: leaderName,
            is_read: false,
          }));

          await supabase.from("notifications").insert(notificationInserts);
        }
      }

      setVisible(false);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 300);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "#1A2234",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "white",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    colorScheme: "dark" as const,
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  const labelStyle = {
    display: "block" as const,
    color: "rgba(255,255,255,0.7)",
    fontSize: "12px",
    fontWeight: 600 as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        background: visible ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(8px)" : "none",
        transition: "all 0.3s",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "640px",
          margin: "0 auto",
          background: "#121820",
          borderRadius: "24px 24px 0 0",
          border: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "none",
          padding: "32px 32px 40px",
          maxHeight: "90vh",
          overflowY: "auto",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <div>
            <h2
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "22px",
                margin: "0 0 4px",
              }}
            >
              Join a Competition 🚀
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.68)",
                fontSize: "13px",
                margin: 0,
              }}
            >
              Langkah {step} dari 2
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "#1A2234",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "10px",
              width: "36px",
              height: "36px",
              color: "rgba(255,255,255,0.72)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ×
          </button>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {[1, 2].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: "3px",
                borderRadius: "100px",
                background:
                  s <= step
                    ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                    : "rgba(255,255,255,0.1)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        {step === 1 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Competition select */}
            <div>
              <label style={labelStyle}>Pilih Lomba</label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <button
                  onClick={() => setIsCustomComp(false)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: !isCustomComp
                      ? "rgba(99,102,241,0.2)"
                      : "transparent",
                    border: `1px solid ${!isCustomComp ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: !isCustomComp ? "#a5b4fc" : "rgba(255,255,255,0.72)",
                  }}
                >
                  Dari daftar
                </button>
                <button
                  onClick={() => setIsCustomComp(true)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    background: isCustomComp
                      ? "rgba(99,102,241,0.2)"
                      : "transparent",
                    border: `1px solid ${isCustomComp ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`,
                    color: isCustomComp ? "#a5b4fc" : "rgba(255,255,255,0.72)",
                  }}
                >
                  + Tambah sendiri
                </button>
              </div>

              {!isCustomComp ? (
                <select
                  style={selectStyle}
                  value={selectedComp?.id ?? ""}
                  onChange={(e) =>
                    setSelectedComp(
                      competitions.find((c) => c.id === e.target.value) ?? null,
                    )
                  }
                >
                  <option value="">-- Pilih lomba --</option>
                  {competitions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} • {c.organizer}
                    </option>
                  ))}
                </select>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <input
                    style={inputStyle}
                    placeholder="Nama lomba"
                    value={customComp.name}
                    onChange={(e) =>
                      setCustomComp((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                  <input
                    style={inputStyle}
                    placeholder="Penyelenggara"
                    value={customComp.organizer}
                    onChange={(e) =>
                      setCustomComp((p) => ({
                        ...p,
                        organizer: e.target.value,
                      }))
                    }
                  />
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="date"
                      style={inputStyle}
                      value={customComp.deadline}
                      onChange={(e) =>
                        setCustomComp((p) => ({
                          ...p,
                          deadline: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="10"
                      style={inputStyle}
                      placeholder="Maks anggota"
                      value={customComp.maxMembers}
                      onChange={(e) =>
                        setCustomComp((p) => ({
                          ...p,
                          maxMembers: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Competition type */}
            <div>
              <label style={labelStyle}>Jenis Lomba</label>
              <select
                style={selectStyle}
                value={selectedCompType}
                onChange={(e) => setSelectedCompType(e.target.value)}
              >
                <option value="">-- Pilih jenis --</option>
                {compTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
                <option value="custom">+ Tambah jenis baru...</option>
              </select>
              {selectedCompType === "custom" && (
                <input
                  style={{ ...inputStyle, marginTop: "8px" }}
                  placeholder="Nama jenis lomba baru"
                  value={customCompType}
                  onChange={(e) => setCustomCompType(e.target.value)}
                />
              )}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={
                !isCustomComp
                  ? !selectedComp
                  : !customComp.name ||
                    !customComp.organizer ||
                    !customComp.deadline
              }
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                borderRadius: "12px",
                padding: "12px",
                color: "white",
                fontWeight: 600,
                fontSize: "15px",
                cursor: "pointer",
                opacity: (!isCustomComp ? !selectedComp : !customComp.name)
                  ? 0.5
                  : 1,
              }}
            >
              Selanjutnya →
            </button>
          </div>
        )}

        {step === 2 && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Team name */}
            <div>
              <label style={labelStyle}>Nama Tim</label>
              <input
                style={inputStyle}
                placeholder="Masukkan nama tim..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            {/* Max members */}
            <div>
              <label style={labelStyle}>Jumlah Anggota Maksimal</label>
              <input
                type="number"
                min="1"
                max="10"
                style={inputStyle}
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
              />
            </div>

            {/* Has team */}
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={hasTeam}
                  onChange={(e) => setHasTeam(e.target.checked)}
                  style={{
                    width: "16px",
                    height: "16px",
                    accentColor: "#6366f1",
                  }}
                />
                <span
                  style={{ color: "rgba(255,255,255,0.78)", fontSize: "14px" }}
                >
                  Saya sudah punya anggota tim
                </span>
              </label>
            </div>

            {hasTeam && (
              <div>
                <label style={labelStyle}>Tambah Anggota (cari username)</label>
                <input
                  style={inputStyle}
                  placeholder="Cari username atau nama..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                />
                {filteredMembers.length > 0 && (
                  <div
                    style={{
                      background: "#1A2234",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      marginTop: "4px",
                      maxHeight: "160px",
                      overflowY: "auto",
                    }}
                  >
                    {filteredMembers.slice(0, 8).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          if (
                            !selectedMembers.some((sm) => sm.id === m.id)
                          ) {
                            setSelectedMembers((p) => [
                              ...p,
                              m,
                            ]);
                          }
                          setMemberSearch("");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "10px 14px",
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.78)",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "13px",
                        }}
                      >
                        <span>@{m.username}</span>
                        <span
                          style={{
                            color: "rgba(255,255,255,0.62)",
                            fontSize: "12px",
                          }}
                        >
                          {m.real_name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {selectedMembers.length > 0 && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {selectedMembers.map((m, i) => (
                      <div
                        key={m.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "rgba(99,102,241,0.08)",
                          border: "1px solid rgba(99,102,241,0.2)",
                          borderRadius: "10px",
                          padding: "8px 12px",
                        }}
                      >
                        <span
                          style={{
                            color: "#a5b4fc",
                            fontSize: "13px",
                            flex: 1,
                          }}
                        >
                          @{m.username}
                        </span>
                        <button
                          onClick={() =>
                            setSelectedMembers((p) =>
                              p.filter((_, idx) => idx !== i),
                            )
                          }
                          style={{
                            background: "none",
                            border: "none",
                            color: "#f87171",
                            cursor: "pointer",
                            fontSize: "16px",
                            padding: "0 4px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Team Note */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <label style={labelStyle}>Catatan Tim</label>
                <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>
                  {teamNote.length}/200
                </span>
              </div>
              <textarea
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "80px",
                }}
                placeholder="Tulis catatan tim (misal: butuh UI/UX designer, target juara, dll.)"
                maxLength={200}
                value={teamNote}
                onChange={(e) => setTeamNote(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "12px",
                  color: "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ← Kembali
              </button>
              <button
                onClick={handleSubmit}
                disabled={!teamName || submitting}
                style={{
                  flex: 2,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "15px",
                  cursor: "pointer",
                  opacity: !teamName ? 0.5 : 1,
                }}
              >
                {submitting ? "Membuat tim..." : "🚀 Buat Tim"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
