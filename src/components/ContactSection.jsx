import { useState } from 'react'
import { MapPin, Mail, Phone, Send } from 'lucide-react'

const info = [
  { icon: MapPin, label: 'Address', value: '14-B Gulberg III, Lahore, Pakistan' },
  { icon: Mail, label: 'Email', value: 'hello@hma-store.pk' },
  { icon: Phone, label: 'Phone', value: '+92 300 1234567' },
]

export default function ContactSection() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name:'', email:'', message:'' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" style={{ padding:'6rem 0', background:'#141414' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem' }}>

        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Get in Touch</span>
          <div className="eyebrow-line" />
        </div>
        <h2 className="section-title">Contact Us</h2>
        <p className="section-sub">We'd love to hear from you</p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem', marginTop:'4rem' }}>

          {/* Info */}
          <div>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.5)', lineHeight:1.8, marginBottom:'2.5rem' }}>
              Have a question or want to collaborate? Our team responds within 24 hours.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:'2rem', marginBottom:'2.5rem' }}>
              {info.map((item, i) => (
                <div key={i} style={{ display:'flex', gap:'1.25rem', alignItems:'flex-start' }}>
                  <div style={{ width:'40px', height:'40px', border:'1px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <item.icon size={15} style={{ color:'#C9A84C' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', marginBottom:'4px' }}>{item.label}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.75)', fontSize:'0.9rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative map */}
            <div style={{ height:'180px', background:'#0a0a0a', border:'1px solid rgba(201,168,76,0.1)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05 }}>
                <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="1"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#g)" />
              </svg>
              <div style={{ textAlign:'center', position:'relative' }}>
                <MapPin size={28} style={{ color:'rgba(201,168,76,0.3)', margin:'0 auto 0.5rem' }} />
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.2)' }}>Lahore, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
            {[
              { label:'Your Name', key:'name', type:'text', placeholder:'Haris Shahnawaz' },
              { label:'Email Address', key:'email', type:'email', placeholder:'hello@example.com' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', display:'block', marginBottom:'0.5rem' }}>{f.label}</label>
                <input type={f.type} required value={form[f.key]} placeholder={f.placeholder}
                  onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  className="form-input" />
              </div>
            ))}
            <div>
              <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', display:'block', marginBottom:'0.5rem' }}>Message</label>
              <textarea required rows={5} value={form.message} placeholder="Tell us how we can help..."
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="form-input" style={{ resize:'none' }} />
            </div>
            <div>
              <button type="submit" className="btn-gold">
                {sent ? '✓ Message Sent!' : <><Send size={14} /> Send Message</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}