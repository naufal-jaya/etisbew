'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"
import { createClient } from '@/utils/supabase/client'

export default function MemberLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.endsWith('@apps.ipb.ac.id')) {
      setError('Gunakan email @apps.ipb.ac.id kamu')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push('/matchmakieeeng')
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email atau password salah'
        : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121820]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; }
        
        .login-card {
          background: #1E2638;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px;
          width: 100%;
          max-width: 420px;
        }

        .title {
          font-size: 32px;
          font-weight: 700;
          color: white;
          margin: 0 0 8px;
          line-height: 1.2;
        }

        .subtitle {
          color: rgba(255,255,255,0.4);
          font-size: 14px;
          margin: 0 0 32px;
        }

        .field { margin-bottom: 16px; }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          margin-bottom: 8px;
        }

        .field input {
          width: 100%;
          background: #121820;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: all 0.2s;
        }

        .field input:focus {
          border-color: #16357B;
          background: rgba(22,53,123,0.1);
        }

        .field input::placeholder { color: rgba(255,255,255,0.2); }

        .error-msg {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 10px;
          padding: 10px 14px;
          color: #fca5a5;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .btn-login {
          width: 100%;
          background: #16357B;
          color: white;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn-login:hover:not(:disabled) {
          background: #1a4299;
        }

        .btn-login:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          text-align: center;
          color: rgba(255,255,255,0.2);
          font-size: 12px;
          margin-top: 24px;
        }

        .forgot-link {
          display: inline-block;
          color: #93c5fd;
          font-size: 13px;
          text-decoration: none;
          margin-top: 2px;
        }

        .forgot-link:hover { text-decoration: underline; }
      `}</style>

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, padding: '0 20px' }}>
        <div className="login-card">
          <h1 className="title">Selamat datang<br/>kembali</h1>
          <p className="subtitle">Login dengan akun @apps.ipb.ac.id</p>

          <form onSubmit={handleLogin}>
            {error && <div className="error-msg">{error}</div>}

            <div className="field">
              <label>Email IPB</label>
              <input
                type="email"
                placeholder="nama@apps.ipb.ac.id"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <Link href="/reset-password" className="forgot-link">
              Lupa password?
            </Link>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk ke Matchmaking →'}
            </button>
          </form>

          <p className="divider">Akun dibuat oleh admin • Hubungi admin jika ada masalah</p>
        </div>
      </div>
    </main>
  )
}
