export type Division = 'frontend' | 'backend' | 'mobile' | 'uiux' | 'data' | 'other'

export type CompetitionType = {
  id: string
  name: string
  created_at: string
}

export type MemberRole = {
  id: string
  name: string
  created_at: string
}

export type Member = {
  id: string
  email: string
  username: string
  real_name: string
  wa_number: string
  division: Division
  created_at: string
}

export type Competition = {
  id: string
  name: string
  organizer: string
  poster_url: string | null
  competition_type_id: string
  competition_type?: CompetitionType
  detail_link: string | null
  registration_deadline: string
  max_members: number
  is_custom: boolean
  created_at: string
}

export type Team = {
  id: string
  name: string
  competition_id: string
  competition?: Competition
  leader_id: string
  leader?: Member
  members?: TeamMember[]
  needed_roles?: TeamNeededRole[]
  created_at: string
}

export type TeamMember = {
  id: string
  team_id: string
  member_id: string
  member?: Member
  role_id: string | null
  role?: MemberRole
  status: 'active' | 'pending' | 'rejected'
  joined_at: string
}

export type TeamNeededRole = {
  id: string
  team_id: string
  role_id: string
  role?: MemberRole
  count: number
}

export type JoinRequest = {
  id: string
  team_id: string
  team?: Team
  requester_id: string
  requester?: Member
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled'
  created_at: string
}

export type Notification = {
  id: string
  member_id: string
  type: 'join_request' | 'request_accepted' | 'request_rejected'
  join_request_id: string
  join_request?: JoinRequest
  is_read: boolean
  created_at: string
}
