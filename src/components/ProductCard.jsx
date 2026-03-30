import { useState } from 'react'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'

const tagClass = { New:'tag-new', Sale:'tag-sale', Trending:'tag-trending', Bestseller:'tag-bestseller' }

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart()
  const [hovered, setHovered] = useState(false)
  const isWished = wishlist.includes(product.id)

  return (
    <div className="product-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Image */}
      <div style={{ position:'relative', overflow:'hidden', aspectRatio:'3/4' }}>
        <img src={product.image} alt={product.name}
          style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.7s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          loading="lazy"
        />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.2)', opacity: hovered ? 1 : 0, transition:'opacity 0.4s' }} />

        <span className={tagClass[product.tag] || 'tag-new'}
          style={{ position:'absolute', top:'0.75rem', left:'0.75rem', fontSize:'0.6rem', fontFamily:'DM Sans, sans-serif', letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.25rem 0.6rem' }}>
          {product.tag}
        </span>

        <button onClick={() => toggleWishlist(product.id)}
          style={{ position:'absolute', top:'0.75rem', right:'0.75rem', background:'none', border:'none', cursor:'pointer', color: isWished ? '#f87171' : 'rgba(245,237,217,0.4)', transition:'color 0.3s' }}>
          <Heart size={18} fill={isWished ? 'currentColor' : 'none'} />
        </button>

        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0.75rem', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition:'transform 0.4s ease' }}>
          <button onClick={() => addToCart(product)} className="btn-gold" style={{ width:'100%', fontSize:'0.7rem', padding:'0.65rem' }}>
            <ShoppingBag size={13} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'1rem' }}>
        <h3 style={{ fontFamily:'Playfair Display, serif', color:'#F5EDD9', fontSize:'0.95rem', fontWeight:500, marginBottom:'0.25rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          {product.name}
        </h3>
        <div style={{ display:'flex', alignItems:'center', gap:'0.25rem', marginBottom:'0.5rem' }}>
          <Star size={11} fill="#C9A84C" style={{ color:'#C9A84C' }} />
          <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', color:'rgba(245,237,217,0.4)' }}>{product.rating} ({product.reviews})</span>
        </div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.3)', marginBottom:'2px' }}>{product.category}</div>
            <div style={{ fontFamily:'Playfair Display, serif', color:'#C9A84C', fontSize:'1.1rem', fontWeight:600 }}>
              PKR {product.price.toLocaleString()}
            </div>
          </div>
          <button onClick={() => addToCart(product)} className="show-mobile"
            style={{ width:'36px', height:'36px', border:'1px solid rgba(201,168,76,0.3)', display:'flex', alignItems:'center', justifyContent:'center', color:'#C9A84C', background:'transparent', cursor:'pointer', transition:'all 0.3s' }}>
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}