import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { categories } from '../data/products'

export default function CategoriesSection() {
  const [hovered, setHovered] = useState(null)

  return (
    <section id="categories" style={{ padding:'6rem 0', background:'#141414' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem' }}>

        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Shop by Category</span>
          <div className="eyebrow-line" />
        </div>
        <h2 className="section-title">Browse Collections</h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1rem', marginTop:'3rem' }}>
          {categories.map(cat => (
            <div key={cat.id} className="cat-card"
              style={{ position:'relative', overflow:'hidden', aspectRatio:'2/3', cursor:'pointer', border: hovered === cat.id ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent', transition:'border-color 0.4s' }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}>

              <img src={cat.image} alt={cat.name} className="cat-img"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }} />
              {hovered === cat.id && <div style={{ position:'absolute', inset:0, background:'rgba(201,168,76,0.04)' }} />}

              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem', transform: hovered === cat.id ? 'translateY(0)' : 'translateY(4px)', transition:'transform 0.4s' }}>
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', display:'block', marginBottom:'0.5rem' }}>
                  {cat.count}+ Items
                </span>
                <h3 style={{ fontFamily:'Playfair Display, serif', color:'#F5EDD9', fontSize:'2.5rem', fontWeight:700, marginBottom:'0.5rem' }}>{cat.name}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.5)', fontSize:'0.85rem', marginBottom:'1rem', opacity: hovered === cat.id ? 1 : 0, transition:'opacity 0.3s 0.1s' }}>
                  {cat.description}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#C9A84C', fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', opacity: hovered === cat.id ? 1 : 0, transition:'opacity 0.3s 0.15s' }}>
                  Shop Now <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}