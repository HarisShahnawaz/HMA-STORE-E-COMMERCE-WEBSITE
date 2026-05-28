import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/header';
import Footer from './components/Layout/footer';
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Checkout from "./Pages/Checkout";
import ProductDetail from "./Pages/ProductDetail";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminProductForm from "./Pages/Admin/AdminProductForm";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import HMAAssistant from './components/Layout/HMAAssistant';
import SearchPage from './Pages/SearchPage';
import { useLocation } from 'react-router-dom';
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

// ── Wrapper to hide assistant on admin pages ──
function AssistantWrapper() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) return null;
  return <HMAAssistant />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Admin Routes ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute><AdminProducts /></ProtectedRoute>
        } />
        <Route path="/admin/products/new" element={
          <ProtectedRoute><AdminProductForm /></ProtectedRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <ProtectedRoute><AdminProductForm /></ProtectedRoute>
        } />

        {/* ── Public Routes ── */}
        <Route path="/*" element={
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<CategoryPage title="Men" description="Sophisticated essentials crafted for the modern man. Discover tailored pieces that blend timeless style with contemporary comfort." filterOptions={{ category: "men" }} />} />
              <Route path="/women" element={<CategoryPage title="Women" description="Elegant silhouettes and contemporary designs. Explore our curated selection of women's fashion, from timeless staples to bold statement pieces." filterOptions={{ category: "women" }} />} />
              <Route path="/kids" element={<CategoryPage title="Kids" description="Comfort meets style for the little ones. Discover our playful collection of durable, high-quality clothing for children of all ages." filterOptions={{ category: "kids" }} />} />
              <Route path="/new-arrivals" element={<CategoryPage title="New Arrivals" description="The latest drops from Men, Women, and Kids collections." filterOptions={{ isNew: true }} />} />
              <Route path="/sale" element={<CategoryPage title="Exclusive Sale" description="Unbeatable prices on high-quality fashion. Grab your favorites before they're gone." filterOptions={{ isSale: true }} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>

      {/* ── Assistant renders outside all routes, always on top this is necessary// ── */}
      <AssistantWrapper />
    </Router>
  );
}

export default App;