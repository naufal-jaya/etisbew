'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
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

export default function ResetPasswordPage() {
  const supabase = useMemo(() => createClient(), [])
  const [mode, setMode] = useState<'request' | 'update'>('request')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const prepareRecoverySession = async () => {
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code')

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) setMode('update')
        return
      }

      const hashParams = new URLSearchParams(window.location.hash.slice(1))
      if (hashParams.get('type') === 'recovery' || hashParams.get('access_token')) {
        setMode('update')
      }
    }

    prepareRecoverySession()

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setMode('update')
    })

    return () => listener.subscription.unsubscribe()
  }, [supabase])

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.endsWith('@apps.ipb.ac.id')) {
      setError('Gunakan email @apps.ipb.ac.id kamu')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      setSuccess('Link reset password sudah dikirim. Cek inbox atau spam email IPB kamu.')
    } catch (err: any) {
      setError(err.message || 'Gagal mengirim link reset password')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('Password minimal 8 karakter')
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password belum sama')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      setSuccess('Password berhasil diganti. Kamu bisa login lagi dengan password baru.')
      setPassword('')
      setConfirmPassword('')
    } catch (err: any) {
      setError(err.message || 'Gagal mengganti password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f0f1a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; box-sizing: border-box; }

        .reset-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 48px;
          width: 100%;
          max-width: 440px;
          backdrop-filter: blur(20px);
        }

        .glow-ring {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(20,184,166,0.28) 0%, transparent 70%);
          top: -100px; left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          filter: blur(40px);
        }

        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(20,184,166,0.14);
          border: 1px solid rgba(20,184,166,0.28);
          border-radius: 100px;
          padding: 6px 14px;
          color: #99f6e4;
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
          color: rgba(255,255,255,0.48);
          font-size: 14px;
          line-height: 1.6;
          margin: 0 0 32px;
        }

        .field { margin-bottom: 16px; }
        .field label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
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
          border-color: rgba(20,184,166,0.65);
          background: rgba(20,184,166,0.08);
          box-shadow: 0 0 0 3px rgba(20,184,166,0.12);
        }

        .field input::placeholder { color: rgba(255,255,255,0.2); }

        .status-msg {
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .error-msg {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
        }

        .success-msg {
          background: rgba(20,184,166,0.12);
          border: 1px solid rgba(20,184,166,0.25);
          color: #99f6e4;
        }

        .btn-reset {
          width: 100%;
          background: linear-gradient(135deg, #14b8a6, #6366f1);
          color: white;
          font-weight: 600;
          font-size: 15px;
          border: none;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .btn-reset:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(20,184,166,0.28);
        }

        .btn-reset:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .divider {
          text-align: center;
          color: rgba(255,255,255,0.28);
          font-size: 12px;
          margin-top: 24px;
        }

        .divider a {
          color: #99f6e4;
          text-decoration: none;
        }

        .divider a:hover { text-decoration: underline; }

        .particles {
          position: fixed; inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 2px; height: 2px;
          background: rgba(20,184,166,0.55);
          border-radius: 50%;
          animation: float var(--dur) var(--delay) infinite linear;
        }

        @keyframes float {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(var(--drift)); opacity: 0; }
        }

        @media (max-width: 520px) {
          .reset-card { padding: 32px 24px; }
          .title { font-size: 28px; }
        }
      `}</style>

      <div className="particles">
        {particles.map((style, i) => (
          <div key={i} className="particle" style={style} />
        ))}
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 440, padding: '0 20px' }}>
        <div className="glow-ring" />
        <div className="reset-card">
          <div className="logo-badge">
            <span>Reset Password</span>
          </div>

          {mode === 'request' ? (
            <>
              <h1 className="title">Atur ulang password</h1>
              <p className="subtitle">
                Masukkan email IPB kamu. Kami akan kirim link sementara untuk membuat password baru.
              </p>

              <form onSubmit={handleResetRequest}>
                {error && <div className="status-msg error-msg">{error}</div>}
                {success && <div className="status-msg success-msg">{success}</div>}

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

                <button type="submit" className="btn-reset" disabled={loading}>
                  {loading ? 'Mengirim...' : 'Kirim link reset'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="title">Buat password baru</h1>
              <p className="subtitle">
                Gunakan password minimal 8 karakter agar akun member kamu tetap aman.
              </p>

              <form onSubmit={handlePasswordUpdate}>
                {error && <div className="status-msg error-msg">{error}</div>}
                {success && <div className="status-msg success-msg">{success}</div>}

                <div className="field">
                  <label>Password baru</label>
                  <input
                    type="password"
                    placeholder="Minimal 8 karakter"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <div className="field">
                  <label>Konfirmasi password</label>
                  <input
                    type="password"
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>

                <button type="submit" className="btn-reset" disabled={loading}>
                  {loading ? 'Menyimpan...' : 'Simpan password baru'}
                </button>
              </form>
            </>
          )}

          <p className="divider">
            Sudah ingat password? <Link href="/member-login">Kembali login</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
