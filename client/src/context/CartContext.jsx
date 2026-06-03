import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if it exists
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("hma_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("hma_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === product.id && item.size === product.size);
      if (isItemInCart) {
        return prev.map((item) =>
          (item.id === product.id && item.size === product.size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id, size, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item.id === id && item.size === size) ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  // ADD THIS FUNCTION HERE
  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, // AND ADD IT HERE
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);