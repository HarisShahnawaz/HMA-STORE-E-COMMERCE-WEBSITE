import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { categories, products } from '../data/products'
import ProductCard from './ProductCard'

export default function CategoriesSection() {
  const [hovered, setHovered] = useState(null)
  const [selectedCat, setSelectedCat] = useState(null)

  const filteredProducts = selectedCat
    ? products.filter(p => p.category === selectedCat)
    : []

  return (
    <section id="categories" style={{ padding:'6rem 0', background:'#141414' }}>
      <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem' }}>

        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Shop by Category</span>
          <div className="eyebrow-line" />
        </div>
        <h2 className="section-title">Browse Collections</h2>

        {/* Category Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'1rem', marginTop:'3rem' }}>
          {categories.map(cat => (
            <div key={cat.id} className="cat-card"
              style={{ position:'relative', overflow:'hidden', aspectRatio:'2/3', cursor:'pointer', border: selectedCat === cat.name ? '1px solid rgba(201,168,76,0.6)' : hovered === cat.id ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent', transition:'border-color 0.4s' }}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelectedCat(selectedCat === cat.name ? null : cat.name)}>

              <img src={cat.image} alt={cat.name} className="cat-img"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }} />
              {selectedCat === cat.name && <div style={{ position:'absolute', inset:0, background:'rgba(201,168,76,0.08)' }} />}

              {/* Selected badge */}
              {selectedCat === cat.name && (
                <div style={{ position:'absolute', top:'1rem', right:'1rem', background:'#C9A84C', color:'#0a0a0a', fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.3rem 0.7rem', fontWeight:700 }}>
                  Selected
                </div>
              )}

              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'2rem' }}>
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', display:'block', marginBottom:'0.5rem' }}>
                  {products.filter(p => p.category === cat.name).length} Items
                </span>
                <h3 style={{ fontFamily:'Playfair Display, serif', color:'#F5EDD9', fontSize:'2.5rem', fontWeight:700, marginBottom:'0.5rem' }}>{cat.name}</h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.5)', fontSize:'0.85rem', marginBottom:'1rem' }}>
                  {cat.description}
                </p>
                <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', color:'#C9A84C', fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase' }}>
                  {selectedCat === cat.name ? 'Hide Products' : 'Shop Now'} <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {selectedCat && (
          <div style={{ marginTop:'4rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <h3 style={{ fontFamily:'Playfair Display, serif', fontSize:'1.8rem', color:'#F5EDD9', fontWeight:700 }}>
                  {selectedCat}'s Collection
                </h3>
                <p style={{ fontFamily:'DM Sans, sans-serif', color:'rgba(245,237,217,0.4)', fontSize:'0.85rem', marginTop:'4px' }}>
                  {filteredProducts.length} products found
                </p>
              </div>
              <button onClick={() => setSelectedCat(null)}
                style={{ display:'flex', alignItems:'center', gap:'0.5rem', background:'none', border:'1px solid rgba(201,168,76,0.3)', color:'rgba(245,237,217,0.6)', fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.5rem 1rem', cursor:'pointer', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#C9A84C'; e.currentTarget.style.color='#C9A84C' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; e.currentTarget.style.color='rgba(245,237,217,0.6)' }}>
                <X size={13} /> Close
              </button>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'1.25rem' }}>
              {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}