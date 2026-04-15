import { supabase } from '../../lib/supabase'
import { Member } from '@/types/database'

export async function getCurrentUser(): Promise<Member | null> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const { data } = await supabase
    .from('members')
    .select('*')
    .eq('id', session.user.id)
    .single()

  return data
}

export async function loginWithEmail(email: string, password: string) {
  if (!email.endsWith('@apps.ipb.ac.id')) {
    throw new Error('Hanya email @apps.ipb.ac.id yang diizinkan')
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function logout() {
  await supabase.auth.signOut()
}