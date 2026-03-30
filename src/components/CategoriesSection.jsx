import { useState, useMemo, useRef, useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { categories, products } from '../data/products'
import ProductCard from './ProductCard'

export default function CategoriesSection() {
  const [hovered, setHovered] = useState(null)
  const [selectedCatId, setSelectedCatId] = useState(null)

  const productsRef = useRef(null)

  // Get selected category object
  const selectedCategory = useMemo(
    () => categories.find(c => c.id === selectedCatId),
    [selectedCatId]
  )

  // Filter products only once
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return []
    return products.filter(p => p.category === selectedCategory.name)
  }, [selectedCategory])

  // Count products per category (optimized)
  const productCountByCategory = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})
  }, [])

  // Smooth scroll when category selected
  useEffect(() => {
    if (selectedCategory && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedCategory])

  return (
    <section id="categories" style={{ padding: '6rem 0', background: '#141414' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div className="section-eyebrow">
          <div className="eyebrow-line" />
          <span className="eyebrow-text">Shop by Category</span>
          <div className="eyebrow-line" />
        </div>

        <h2 className="section-title">Browse Collections</h2>

        {/* Categories Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '3rem'
          }}
        >
          {categories.map(cat => {
            const isSelected = selectedCatId === cat.id

            return (
              <div
                key={cat.id}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '2/3',
                  cursor: 'pointer',
                  border: isSelected
                    ? '1px solid rgba(201,168,76,0.6)'
                    : hovered === cat.id
                    ? '1px solid rgba(201,168,76,0.3)'
                    : '1px solid transparent',
                  transition: 'border-color 0.4s'
                }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() =>
                  setSelectedCatId(isSelected ? null : cat.id)
                }
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform:
                      hovered === cat.id ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.6s ease'
                  }}
                />

                {/* Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)'
                  }}
                />

                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(201,168,76,0.08)'
                    }}
                  />
                )}

                {/* Selected Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: '#C9A84C',
                      color: '#0a0a0a',
                      fontSize: '0.6rem',
                      padding: '0.3rem 0.7rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}
                  >
                    Selected
                  </div>
                )}

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2rem'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#C9A84C',
                      display: 'block',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {productCountByCategory[cat.name] || 0} Items
                  </span>

                  <h3
                    style={{
                      color: '#F5EDD9',
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {cat.name}
                  </h3>

                  <p
                    style={{
                      color: 'rgba(245,237,217,0.5)',
                      fontSize: '0.85rem',
                      marginBottom: '1rem'
                    }}
                  >
                    {cat.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#C9A84C',
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {isSelected ? 'Hide Products' : 'Shop Now'}
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Products Section */}
        {selectedCategory && (
          <div ref={productsRef} style={{ marginTop: '4rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#F5EDD9' }}>
                  {selectedCategory.name}'s Collection
                </h3>
                <p style={{ color: 'rgba(245,237,217,0.4)' }}>
                  {filteredProducts.length} products found
                </p>
              </div>

              <button
                onClick={() => setSelectedCatId(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'rgba(245,237,217,0.6)',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                <X size={13} /> Close
              </button>
            </div>

            {/* Products Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}