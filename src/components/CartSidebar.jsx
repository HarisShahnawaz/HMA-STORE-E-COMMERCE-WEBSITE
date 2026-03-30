import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartSidebar() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div onClick={() => setIsCartOpen(false)} style={{
        position:'fixed', inset:0, background:'rgba(10,10,10,0.85)', backdropFilter:'blur(4px)', zIndex:50,
        opacity: isCartOpen ? 1 : 0, pointerEvents: isCartOpen ? 'auto' : 'none', transition:'opacity 0.4s'
      }} />

      {/* Drawer */}
      <div style={{
        position:'fixed', top:0, right:0, height:'100%', width:'min(100%, 400px)', background:'#141414',
        borderLeft:'1px solid rgba(201,168,76,0.1)', zIndex:50, display:'flex', flexDirection:'column',
        transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)', transition:'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)'
      }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
            <ShoppingBag size={18} style={{ color:'#C9A84C' }} />
            <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.2rem', color:'#F5EDD9' }}>Your Cart</span>
            {cartItems.length > 0 && (
              <span style={{ background:'#C9A84C', color:'#0a0a0a', fontSize:'0.65rem', fontWeight:700, borderRadius:'50%', width:'18px', height:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {cartItems.length}
              </span>
            )}
          </div>
          <button onClick={() => setIsCartOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.4)', transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.4)'}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex:1, overflowY:'auto', padding:'1rem 1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', textAlign:'center', padding:'4rem 0' }}>
              <ShoppingBag size={48} style={{ color:'rgba(245,237,217,0.08)', marginBottom:'1rem' }} />
              <p style={{ fontFamily:'Playfair Display, serif', fontSize:'1.2rem', color:'rgba(245,237,217,0.25)', marginBottom:'0.5rem' }}>Your cart is empty</p>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.85rem', color:'rgba(245,237,217,0.2)', marginBottom:'2rem' }}>Add some items to get started</p>
              <button className="btn-outline" onClick={() => setIsCartOpen(false)} style={{ fontSize:'0.7rem' }}>Continue Shopping</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display:'flex', gap:'1rem', padding:'1rem 0', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width:'70px', height:'85px', flexShrink:0, overflow:'hidden' }}>
                    <img src={item.image} alt={item.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h4 style={{ fontFamily:'Playfair Display, serif', color:'#F5EDD9', fontSize:'0.9rem', fontWeight:500, marginBottom:'2px', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{item.name}</h4>
                    <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.6rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)' }}>{item.category}</span>
                    <div style={{ fontFamily:'Playfair Display, serif', color:'#C9A84C', fontSize:'1rem', fontWeight:600, margin:'4px 0 8px' }}>PKR {item.price.toLocaleString()}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width:'24px', height:'24px', border:'1px solid rgba(201,168,76,0.25)', background:'none', color:'rgba(245,237,217,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Minus size={10} />
                      </button>
                      <span style={{ fontFamily:'DM Sans, sans-serif', color:'#F5EDD9', fontSize:'0.9rem', minWidth:'16px', textAlign:'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width:'24px', height:'24px', border:'1px solid rgba(201,168,76,0.25)', background:'none', color:'rgba(245,237,217,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Plus size={10} />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.2)', transition:'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color='#f87171'}
                        onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.2)'}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ borderTop:'1px solid rgba(201,168,76,0.1)', padding:'1.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.4)' }}>Subtotal</span>
              <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.3rem', color:'#C9A84C', fontWeight:600 }}>PKR {cartTotal.toLocaleString()}</span>
            </div>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', color:'rgba(245,237,217,0.25)', marginBottom:'1rem' }}>Shipping calculated at checkout</p>
            <button className="btn-gold" style={{ width:'100%', marginBottom:'0.75rem' }}>Proceed to Checkout</button>
            <button onClick={() => setIsCartOpen(false)}
              style={{ width:'100%', fontFamily:'DM Sans, sans-serif', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.35)', background:'none', border:'none', cursor:'pointer', transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#F5EDD9'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.35)'}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}