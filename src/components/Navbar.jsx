import { useState, useEffect, useRef } from 'react'
import { ShoppingBag, Search, X, Menu, User } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = ['Men', 'Women', 'Children', 'New Arrivals', 'Sale']

export default function Navbar() {
  const { cartCount, setIsCartOpen, setIsLoginOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? 'rgba(245,240,235,0.97)' : '#f5f0eb',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        padding: '0',
      }}>
        <div style={{ maxWidth: '90rem', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* Logo */}
          <a href="#home" onClick={() => scrollTo('#home')} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
              HMA-Store
            </span>
            <span style={{ marginLeft: '6px', fontSize: '1rem' }}>✦</span>
          </a>

          {/* Center Nav Links */}
          <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {navLinks.map(link => (
              <button key={link} className="nav-link"
                onClick={() => scrollTo(link === 'Men' ? '#categories' : link === 'Women' ? '#categories' : link === 'Children' ? '#categories' : link === 'New Arrivals' ? '#featured' : '#featured')}>
                {link}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Search */}
            {searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', border: '1px solid #e0d8d0', borderRadius: '9999px', padding: '0.4rem 1rem' }}>
                <Search size={15} style={{ color: '#999' }} />
                <input ref={searchRef} value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search..."
                  style={{ background: 'transparent', color: '#1a1a1a', fontSize: '0.85rem', outline: 'none', width: '140px', border: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                <button onClick={() => setSearchOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#666'}
                onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                <Search size={20} />
              </button>
            )}

            {/* User */}
            <button onClick={() => setIsLoginOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
              <User size={20} />
            </button>

            {/* Cart */}
            <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', position: 'relative', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#666'}
              onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#e85d4a', color: '#fff', fontSize: '0.6rem', fontWeight: 700, borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="show-mobile"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a' }}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 40, pointerEvents: mobileOpen ? 'auto' : 'none' }}>
        <div onClick={() => setMobileOpen(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: mobileOpen ? 1 : 0, transition: 'opacity 0.3s' }} />
        <div className="drawer"
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '280px', background: '#f5f0eb', borderRight: '1px solid rgba(0,0,0,0.08)', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', padding: '5rem 2rem 2rem' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, display: 'block', marginBottom: '2rem' }}>HMA-Store ✦</span>
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo('#categories')}
              style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: 500, color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)', width: '100%', textAlign: 'left' }}>
              {link}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}