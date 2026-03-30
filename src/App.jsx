import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedSection from './components/FeaturedSection'
import CategoriesSection from './components/CategoriesSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import LoginModal from './components/LoginModal'
import Toast from './components/Toast'

export default function App() {
  return (
    <CartProvider>
      <div style={{ minHeight:'100vh', background:'#0a0a0a' }}>
        <Navbar />
        <main>
          <Hero />
          <FeaturedSection />
          <CategoriesSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
        <CartSidebar />
        <LoginModal />
        <Toast />
      </div>
    </CartProvider>
  )
}