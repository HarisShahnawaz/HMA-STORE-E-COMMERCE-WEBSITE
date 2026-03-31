import { Mail, Globe, Rss , Share2 } from 'lucide-react'

export default function Footer() {
  const social = [Mail, Globe, Rss, Share2]
  const scroll = (id) => document.querySelector(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <footer style={{ background:'#0a0a0a', borderTop:'1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'4rem 1.5rem 2rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'3rem', marginBottom:'3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.4rem', fontWeight:700, marginBottom:'1rem' }}>
              <span style={{ color:'#F5EDD9' }}>HMA</span><span style={{ color:'#C9A84C' }}>-Store</span>
            </div>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.35)', fontSize:'0.85rem', lineHeight:1.8, marginBottom:'1.5rem' }}>
              Pakistan's first AI-powered luxury fashion destination.
            </p>
            <div style={{ display:'flex', gap:'0.75rem' }}>
              {social.map((Icon, i) => (
                <a key={i} href="#" style={{ width:'36px', height:'36px', border:'1px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(245,237,217,0.35)', textDecoration:'none', transition:'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.borderColor='rgba(201,168,76,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(245,237,217,0.35)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.2)' }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'1.25rem' }}>Quick Links</h4>
            {['Home','About','Contact','Size Guide','FAQs'].map(l => (
              <button key={l} onClick={() => scroll(`#${l.toLowerCase()}`)}
                style={{ display:'block', fontFamily:'DM Sans, sans-serif', fontSize:'0.85rem', color:'rgba(245,237,217,0.4)', background:'none', border:'none', cursor:'pointer', padding:'0.4rem 0', transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.4)'}>
                {l}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'1.25rem' }}>Categories</h4>
            {['Men','Women','Kids','Sale','New Arrivals'].map(l => (
              <button key={l} onClick={() => scroll('#categories')}
                style={{ display:'block', fontFamily:'DM Sans, sans-serif', fontSize:'0.85rem', color:'rgba(245,237,217,0.4)', background:'none', border:'none', cursor:'pointer', padding:'0.4rem 0', transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.4)'}>
                {l}
              </button>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'1.25rem' }}>Newsletter</h4>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.4)', fontSize:'0.85rem', marginBottom:'1rem', lineHeight:1.7 }}>
              AI-curated style tips & exclusive offers.
            </p>
            <div style={{ display:'flex', border:'1px solid rgba(201,168,76,0.2)' }}>
              <input type="email" placeholder="your@email.com"
                style={{ background:'transparent', padding:'0.6rem 0.75rem', fontFamily:'DM Sans, sans-serif', fontSize:'0.8rem', color:'#F5EDD9', border:'none', outline:'none', flex:1, minWidth:0 }} />
              <button className="btn-gold" style={{ padding:'0.6rem 1rem', fontSize:'0.65rem', borderRadius:0 }}>Join</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:'2rem', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', color:'rgba(245,237,217,0.25)' }}>© 2026 HMA-Store By Haris Shahnawaz. All rights reserved.</p>
          <div style={{ display:'flex', gap:'1.5rem' }}>
            {['Privacy Policy','Terms of Service','Returns'].map(l => (
              <a key={l} href="#" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', color:'rgba(245,237,217,0.25)', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.25)'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}