import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  ShoppingBag, Users, Tag, Sparkles, TrendingUp,
  LogOut, Package, Plus, Settings, BarChart3
} from "lucide-react";

export default function AdminDashboard() {
  const { token, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

fetch(`${API_URL}/api/admin/products`, {
  headers: { Authorization: `Bearer ${token}` }
})
      .then(res => res.json())
      .then(products => {
        setStats({
          total: products.length,
          men: products.filter(p => p.category === "men").length,
          women: products.filter(p => p.category === "women").length,
          kids: products.filter(p => p.category === "kids").length,
          isNew: products.filter(p => p.isNew).length,
          isSale: products.filter(p => p.isSale).length,
          aiRecommended: products.filter(p => p.aiRecommended).length,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const statCards = stats ? [
    { label: "Total Products", value: stats.total, icon: <Package size={20} />, color: "bg-black text-white" },
    { label: "Men", value: stats.men, icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" },
    { label: "Women", value: stats.women, icon: <Users size={20} />, color: "bg-pink-50 text-pink-600" },
    { label: "Kids", value: stats.kids, icon: <Users size={20} />, color: "bg-yellow-50 text-yellow-600" },
    { label: "New Arrivals", value: stats.isNew, icon: <TrendingUp size={20} />, color: "bg-green-50 text-green-600" },
    { label: "On Sale", value: stats.isSale, icon: <Tag size={20} />, color: "bg-red-50 text-red-600" },
    { label: "AI Recommended", value: stats.aiRecommended, icon: <Sparkles size={20} />, color: "bg-purple-50 text-purple-600" },
  ] : [];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <ShoppingBag size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-black">HMA-Store</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin Panel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
          >
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Welcome */}
        <div className="mb-10">
          <h2 className="font-serif text-4xl font-bold text-black mb-1">Dashboard</h2>
          <p className="text-gray-400 text-sm">Welcome back, Admin. Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {statCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  {card.icon}
                </div>
                <p className="font-serif text-3xl font-bold text-black">{card.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">{card.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="font-serif text-xl font-bold text-black mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Link
              to="/admin/products"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-black hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-black">Manage Products</p>
                <p className="text-[11px] text-gray-400">View, edit, delete products</p>
              </div>
            </Link>

            <Link
              to="/admin/products/new"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-black hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-black">Add New Product</p>
                <p className="text-[11px] text-gray-400">Create a new listing</p>
              </div>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-black hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 size={20} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-sm text-black">View Store</p>
                <p className="text-[11px] text-gray-400">See live storefront</p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}