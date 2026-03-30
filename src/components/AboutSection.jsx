import { Truck, Sparkles, ShieldCheck } from 'lucide-react'

const features = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide delivery within 2–4 business days. Free shipping on orders over PKR 5,000.' },
  { icon: Sparkles, title: 'AI Recommendations', desc: 'Our AI engine learns your style preferences and curates a personalized shopping experience.' },
  { icon: ShieldCheck, title: 'Secure Payments', desc: '100% secure checkout with SSL encryption. Multiple payment methods accepted.' },
]

export default function AboutSection() {
  return (
    <section id="about" style={{ padding:'6rem 0', background:'#0a0a0a', overflow:'hidden' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem', alignItems:'center' }}>

          {/* Text */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
              <span style={{ width:'2rem', height:'1px', background:'#C9A84C' }} />
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#C9A84C' }}>Our Story</span>
            </div>
            <h2 style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:'#F5EDD9', lineHeight:1.2, marginBottom:'1.5rem' }}>
              About <em style={{ color:'#C9A84C', fontStyle:'italic' }}>HMA-Store</em>
            </h2>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.55)', lineHeight:1.8, marginBottom:'1rem' }}>
              HMA-Store is Pakistan's first AI-powered luxury fashion destination. We believe style should be effortless, personal, and accessible.
            </p>
            <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.45)', lineHeight:1.8, marginBottom:'2.5rem' }}>
              Our intelligent recommendation engine analyzes your preferences and the latest trends to deliver a uniquely curated wardrobe — every time.
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display:'flex', gap:'1.25rem', alignItems:'flex-start' }}>
                  <div style={{ width:'44px', height:'44px', border:'1px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <f.icon size={18} style={{ color:'#C9A84C' }} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily:'Playfair Display, serif', color:'#F5EDD9', fontSize:'1.05rem', fontWeight:600, marginBottom:'0.25rem' }}>{f.title}</h4>
                    <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.45)', fontSize:'0.85rem', lineHeight:1.7 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div style={{ position:'relative' }}>
            <div style={{ overflow:'hidden' }}>
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80" alt="About"
                style={{ width:'100%', height:'580px', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 60%)' }} />
            </div>
            <div style={{ position:'absolute', bottom:'-1.5rem', left:'-1.5rem', background:'#141414', border:'1px solid rgba(201,168,76,0.2)', padding:'1.5rem' }}>
              <div style={{ fontFamily:'Playfair Display, serif', fontSize:'2.5rem', fontWeight:700, color:'#C9A84C' }}>10K+</div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.4)', marginTop:'4px' }}>Happy Customers</div>
            </div>
            <div style={{ position:'absolute', top:'-1rem', right:'-1rem', width:'4rem', height:'4rem', borderTop:'2px solid rgba(201,168,76,0.25)', borderRight:'2px solid rgba(201,168,76,0.25)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}