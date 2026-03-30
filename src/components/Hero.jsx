import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      {/* BG image */}
      <div style={{ position:'absolute', inset:0 }}>
        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=90" alt="Fashion"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.68)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 40%, rgba(10,10,10,0.95) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 1.5rem', maxWidth:'64rem', margin:'0 auto' }}>
        {/* Eyebrow */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:'1rem', marginBottom:'2rem', animation:'fadeIn 0.8s ease forwards' }}>
          <span style={{ width:'2rem', height:'1px', background:'#C9A84C' }} />
          <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.35em', textTransform:'uppercase', color:'#C9A84C' }}>
            AI-Powered Luxury Fashion
          </span>
          <span style={{ width:'2rem', height:'1px', background:'#C9A84C' }} />
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily:'Playfair Display, serif', fontWeight:800, lineHeight:1.1, marginBottom:'1.5rem' }}>
          <span style={{ display:'block', fontSize:'clamp(3rem, 8vw, 6rem)', color:'#F5EDD9', animation:'slideUp 0.7s ease 0.1s both' }}>
            Redefine
          </span>
          <span style={{ display:'block', fontSize:'clamp(3rem, 8vw, 6rem)', animation:'slideUp 0.7s ease 0.2s both' }}>
            Your{' '}
            <em style={{ color:'#C9A84C', fontStyle:'italic', textShadow:'0 0 40px rgba(201,168,76,0.3)' }}>Style</em>
          </span>
        </h1>

        {/* Sub */}
        <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(1rem, 2vw, 1.2rem)', color:'rgba(245,237,217,0.6)', marginBottom:'2.5rem', letterSpacing:'0.05em', animation:'slideUp 0.7s ease 0.3s both' }}>
          Shop the latest trends for{' '}
          <span style={{ color:'rgba(245,237,217,0.9)' }}>Men</span>,{' '}
          <span style={{ color:'rgba(245,237,217,0.9)' }}>Women</span> &{' '}
          <span style={{ color:'rgba(245,237,217,0.9)' }}>Kids</span>
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', animation:'slideUp 0.7s ease 0.4s both' }}>
          <button className="btn-gold" style={{ minWidth:'180px' }}
            onClick={() => document.querySelector('#featured')?.scrollIntoView({ behavior:'smooth' })}>
            Shop Now
          </button>
          <button className="btn-outline" style={{ minWidth:'180px' }}
            onClick={() => document.querySelector('#categories')?.scrollIntoView({ behavior:'smooth' })}>
            Explore Collection
          </button>
        </div>

        {/* Badges */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'2rem', marginTop:'3.5rem', flexWrap:'wrap', animation:'fadeIn 1s ease 0.6s both' }}>
          {['Free Delivery', 'AI Powered', 'Secure Checkout'].map((b, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#C9A84C' }} />
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll arrow */}
      <button className="scroll-arrow" onClick={() => document.querySelector('#featured')?.scrollIntoView({ behavior:'smooth' })}>
        <ChevronDown size={28} strokeWidth={1.5} />
      </button>

      {/* Corner deco */}
      <div style={{ position:'absolute', top:'6rem', left:'2rem', width:'3rem', height:'3rem', borderTop:'1px solid rgba(201,168,76,0.2)', borderLeft:'1px solid rgba(201,168,76,0.2)' }} />
      <div style={{ position:'absolute', bottom:'6rem', right:'2rem', width:'3rem', height:'3rem', borderBottom:'1px solid rgba(201,168,76,0.2)', borderRight:'1px solid rgba(201,168,76,0.2)' }} />
    </section>
  )
}