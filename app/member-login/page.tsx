'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { createClient } from '@/utils/supabase/client'

const particles = Array.from({ length: 20 }, (_, i) => {
  const seed = i + 1
  return {
    left: `${(seed * 37) % 100}%`,
    '--dur': `${4 + ((seed * 17) % 80) / 10}s`,
    '--delay': `-${((seed * 29) % 100) / 10}s`,
    '--drift': `${((seed * 53) % 100) - 50}px`,
  } as React.CSSProperties
})

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
    <main className="min-h-screen flex items-center justify-center bg-[#0f0f1a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; }
        
        .login-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px;
          width: 100%;
          max-width: 420px;
          backdrop-filter: blur(20px);
        }
        
        .glow-ring {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          filter: blur(40px);
        }

        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 100px;
          padding: 6px 14px;
          color: #a5b4fc;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
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
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: all 0.2s;
        }

        .field input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.08);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
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
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .btn-login:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
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

        .particles {
          position: fixed; inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px; height: 2px;
          background: rgba(99,102,241,0.6);
          border-radius: 50%;
          animation: float var(--dur) var(--delay) infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(var(--drift)); opacity: 0; }
        }
      `}</style>

      {/* Background particles */}
      <div className="particles">
        {particles.map((style, i) => (
          <div key={i} className="particle" style={style} />
        ))}
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, padding: '0 20px' }}>
        <div className="glow-ring" />
        <div className="login-card">
          <div className="logo-badge">
            <span>⚡</span>
            <span>IPB Member Portal</span>
          </div>
          <h1 className="title">Selamat datang<br/>kembali 👋</h1>
          <p className="subtitle">Login dengan akun @apps.ipb.ac.id</p>

          <form onSubmit={handleLogin}>
            {error && <div className="error-msg">⚠️ {error}</div>}

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
