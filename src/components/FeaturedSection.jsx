import { useState } from 'react'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const filters = ['All', 'Men', 'Women', 'Kids']

export default function FeaturedSection() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? products : products.filter(p => p.category === active)

  return (
    <section id="featured" style={{ padding:'6rem 0', background:'#0a0a0a' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem' }}>

        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Curated for You</span>
          <div className="eyebrow-line" />
        </div>
        <h2 className="section-title">Featured Collections</h2>
        <p className="section-sub">AI-selected styles based on current trends</p>

        {/* Filters */}
        <div style={{ display:'flex', justifyContent:'center', gap:'0.5rem', margin:'3rem 0', flexWrap:'wrap' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              style={{
                fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.2em',
                textTransform:'uppercase', padding:'0.6rem 1.25rem', border:'1px solid',
                cursor:'pointer', transition:'all 0.3s',
                background: active === f ? '#C9A84C' : 'transparent',
                color: active === f ? '#0a0a0a' : 'rgba(245,237,217,0.45)',
                borderColor: active === f ? '#C9A84C' : 'rgba(255,255,255,0.1)',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1.25rem' }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <button className="btn-outline">View All Products</button>
        </div>
      </div>
    </section>
  )
}