import { useState } from 'react'
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function LoginModal() {
  const { isLoginOpen, setIsLoginOpen } = useCart()
  const [tab, setTab] = useState('login')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email:'', password:'', name:'' })

  if (!isLoginOpen) return null

  return (
    <>
      <div onClick={() => setIsLoginOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(10,10,10,0.92)', backdropFilter:'blur(8px)', zIndex:60, animation:'fadeIn 0.3s ease' }} />
      <div style={{ position:'fixed', inset:0, zIndex:60, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
        <div style={{ background:'#141414', border:'1px solid rgba(201,168,76,0.15)', width:'100%', maxWidth:'440px', position:'relative', animation:'slideUp 0.35s ease', boxShadow:'0 40px 80px rgba(0,0,0,0.6)' }}>

          {/* Close */}
          <button onClick={() => setIsLoginOpen(false)} style={{ position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.3)', transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.3)'}>
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ padding:'2rem 2rem 1.5rem', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
            <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.5rem', fontWeight:700, marginBottom:'4px' }}>
              <span style={{ color:'#F5EDD9' }}>HMA</span><span style={{ color:'#C9A84C' }}>-Store</span>
            </div>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.4)', fontSize:'0.85rem' }}>
              {tab === 'login' ? 'Welcome back' : 'Create your account'}
            </p>
          </div>

          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
            {['login','signup'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                flex:1, padding:'0.9rem', fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase',
                background:'none', border:'none', cursor:'pointer', transition:'all 0.2s',
                color: tab === t ? '#C9A84C' : 'rgba(245,237,217,0.3)',
                borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
              }}>{t === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          <div style={{ padding:'2rem' }}>
            {/* Google */}
            <button style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem', border:'1px solid rgba(255,255,255,0.08)', padding:'0.75rem', fontFamily:'DM Sans, sans-serif', fontSize:'0.85rem', color:'rgba(245,237,217,0.6)', background:'none', cursor:'pointer', marginBottom:'1.5rem', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.25)'; e.currentTarget.style.color='#F5EDD9' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color='rgba(245,237,217,0.6)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04c-.72.48-1.63.76-2.7.76-2.07 0-3.83-1.4-4.46-3.27H1.86v2.07A8 8 0 0 0 8.98 17z"/>
                <path fill="#FBBC05" d="M4.52 10.51A4.8 4.8 0 0 1 4.27 9c0-.52.09-1.03.25-1.51V5.42H1.86A8 8 0 0 0 .98 9c0 1.29.31 2.51.88 3.58l2.66-2.07z"/>
                <path fill="#EA4335" d="M8.98 3.58c1.16 0 2.2.4 3.02 1.19l2.26-2.26A8 8 0 0 0 8.98 1a8 8 0 0 0-7.12 4.42l2.66 2.07c.63-1.87 2.38-3.27 4.46-3.27z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
              <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.05)' }} />
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', color:'rgba(245,237,217,0.2)', letterSpacing:'0.15em', textTransform:'uppercase' }}>or</span>
              <div style={{ flex:1, height:'1px', background:'rgba(255,255,255,0.05)' }} />
            </div>

            <form onSubmit={e => { e.preventDefault(); setIsLoginOpen(false) }} style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {tab === 'signup' && (
                <div>
                  <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', display:'block', marginBottom:'6px' }}>Full Name</label>
                  <input type="text" required value={form.name} placeholder="Haris Shahnawaz"
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="form-input" />
                </div>
              )}
              <div>
                <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', display:'block', marginBottom:'6px' }}>Email</label>
                <div style={{ position:'relative' }}>
                  <Mail size={13} style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', color:'rgba(245,237,217,0.2)' }} />
                  <input type="email" required value={form.email} placeholder="you@email.com"
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="form-input" style={{ paddingLeft:'1.5rem' }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', display:'block', marginBottom:'6px' }}>Password</label>
                <div style={{ position:'relative' }}>
                  <Lock size={13} style={{ position:'absolute', left:0, top:'50%', transform:'translateY(-50%)', color:'rgba(245,237,217,0.2)' }} />
                  <input type={showPass ? 'text' : 'password'} required value={form.password} placeholder="••••••••"
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="form-input" style={{ paddingLeft:'1.5rem', paddingRight:'1.5rem' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    style={{ position:'absolute', right:0, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.2)' }}>
                    {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>
              {tab === 'login' && (
                <div style={{ textAlign:'right' }}>
                  <a href="#" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', color:'rgba(201,168,76,0.6)', textDecoration:'none' }}>Forgot password?</a>
                </div>
              )}
              <button type="submit" className="btn-gold" style={{ width:'100%' }}>
                {tab === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', color:'rgba(245,237,217,0.3)', textAlign:'center', marginTop:'1.25rem' }}>
              {tab === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
                style={{ color:'#C9A84C', background:'none', border:'none', cursor:'pointer', fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem' }}>
                {tab === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}