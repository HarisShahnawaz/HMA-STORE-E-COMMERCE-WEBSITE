import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [toasts, setToasts] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const addToast = useCallback((message) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...product, quantity: 1 }]
    })
    addToast(`${product.name} added to cart!`)
  }, [addToast])

  const removeFromCart = useCallback((id) => setCartItems(prev => prev.filter(i => i.id !== id)), [])

  const updateQuantity = useCallback((id, qty) => {
    if (qty < 1) return
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }, [])

  const toggleWishlist = useCallback((id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }, [])

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity,
      wishlist, toggleWishlist,
      cartTotal, cartCount,
      isCartOpen, setIsCartOpen,
      isLoginOpen, setIsLoginOpen,
      toasts,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)