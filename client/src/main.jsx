import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AdminAuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
