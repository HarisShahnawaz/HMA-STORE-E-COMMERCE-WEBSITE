import { useState, useEffect, useRef } from 'react'
import { ShoppingBag, Search, X, Menu, ChevronDown, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsLoginOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50, transition:'all 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      }}>
        <div style={{ maxWidth:'80rem', margin:'0 auto', padding:'0 1.5rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>

          {/* Logo */}
          <a href="#home" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
            <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.5rem', fontWeight:700, color:'#F5EDD9' }}>HMA</span>
            <span style={{ fontFamily:'Playfair Display, serif', fontSize:'1.5rem', fontWeight:700, color:'#C9A84C' }}>-Store</span>
          </a>

          {/* Desktop links */}
          <div className="hidden-mobile" style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
            {['Home','About','Contact'].map(label => (
              <button key={label} className="nav-link" onClick={() => scrollTo(`#${label.toLowerCase()}`)}>
                {label}
              </button>
            ))}
            {/* Dropdown */}
            <div style={{ position:'relative' }}>
              <button className="nav-link" style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}>
                Categories <ChevronDown size={13} style={{ transition:'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              {dropdownOpen && (
                <div style={{ position:'absolute', top:'calc(100% + 0.75rem)', left:'50%', transform:'translateX(-50%)', background:'#141414', border:'1px solid rgba(201,168,76,0.15)', minWidth:'130px', boxShadow:'0 20px 40px rgba(0,0,0,0.5)', animation:'fadeIn 0.2s ease' }}>
                  {['Men','Women','Kids'].map(item => (
                    <button key={item} onClick={() => { scrollTo('#categories'); setDropdownOpen(false) }}
                      style={{ display:'block', width:'100%', textAlign:'left', padding:'0.75rem 1.25rem', fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.6)', background:'none', border:'none', cursor:'pointer', transition:'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color='#C9A84C'}
                      onMouseLeave={e => e.target.style.color='rgba(245,237,217,0.6)'}>
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right icons */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
            {searchOpen ? (
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', borderBottom:'1px solid rgba(201,168,76,0.4)', paddingBottom:'2px' }}>
                <input ref={searchRef} value={searchVal} onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search..."
                  style={{ background:'transparent', color:'#F5EDD9', fontSize:'0.85rem', outline:'none', width:'130px', fontFamily:'DM Sans, sans-serif', border:'none' }} />
                <button onClick={() => setSearchOpen(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'#C9A84C' }}><X size={15} /></button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.7)', transition:'color 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.7)'}>
                <Search size={19} />
              </button>
            )}

            <button onClick={() => setIsCartOpen(true)} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.7)', position:'relative', transition:'color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.7)'}>
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span style={{ position:'absolute', top:'-8px', right:'-8px', background:'#C9A84C', color:'#0a0a0a', fontSize:'0.65rem', fontWeight:700, borderRadius:'50%', width:'16px', height:'16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setIsLoginOpen(true)} className="hidden-mobile"
              style={{ display:'flex', alignItems:'center', gap:'0.4rem', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', fontFamily:'DM Sans, sans-serif', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.5rem 1rem', background:'transparent', cursor:'pointer', transition:'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#C9A84C'; e.currentTarget.style.color='#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#C9A84C' }}>
              <User size={13} /> Login
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile"
              style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,237,217,0.8)' }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{ position:'fixed', inset:0, zIndex:40, pointerEvents: mobileOpen ? 'auto' : 'none' }}>
        <div onClick={() => setMobileOpen(false)}
          style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.85)', backdropFilter:'blur(4px)', opacity: mobileOpen ? 1 : 0, transition:'opacity 0.3s' }} />
        <div className="drawer"
          style={{ position:'absolute', top:0, left:0, height:'100%', width:'280px', background:'#141414', borderRight:'1px solid rgba(201,168,76,0.1)', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', padding:'5rem 2rem 2rem' }}>
          <div style={{ fontFamily:'Playfair Display, serif', fontSize:'1.3rem', fontWeight:700, marginBottom:'1.5rem' }}>
            <span style={{ color:'#F5EDD9' }}>HMA</span><span style={{ color:'#C9A84C' }}>-Store</span>
          </div>
          <div style={{ width:'2rem', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'1.5rem' }} />
          {['home','categories','about','contact'].map(page => (
            <button key={page} onClick={() => scrollTo(`#${page}`)}
              style={{ display:'block', fontFamily:'DM Sans, sans-serif', fontSize:'0.75rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(245,237,217,0.7)', background:'none', border:'none', cursor:'pointer', padding:'0.75rem 0', transition:'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#C9A84C'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(245,237,217,0.7)'}>
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
          <div style={{ width:'2rem', height:'1px', background:'rgba(201,168,76,0.3)', margin:'1rem 0' }} />
          <button onClick={() => { setIsLoginOpen(true); setMobileOpen(false) }} className="btn-outline" style={{ width:'100%', marginTop:'0.5rem' }}>
            Login
          </button>
        </div>
      </div>
    </>
  )
}