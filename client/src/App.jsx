import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/header';
import Footer from './components/Layout/footer';
import Home from './Pages/Home';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kids from './Pages/Kids';
import NewArrivals from './Pages/NewArrivals';
import Sale from './Pages/Sale';
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
              <Route path="/men" element={<Men />} />
              <Route path="/women" element={<Women />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>

      {/* ── Assistant renders outside all routes, always on top ── */}
      <AssistantWrapper />
    </Router>
  );
}

export default App;