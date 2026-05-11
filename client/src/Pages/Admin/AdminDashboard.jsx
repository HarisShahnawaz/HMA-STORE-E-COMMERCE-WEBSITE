import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard, Package, Plus, LogOut,
  ShoppingBag, TrendingUp, Tag, Sparkles,
  Users, BarChart3, ExternalLink, Menu, X
} from "lucide-react";

function Sidebar({ open, onClose }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const links = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", to: "/admin/dashboard" },
    { icon: <Package size={18} />, label: "Products", to: "/admin/products" },
    { icon: <Plus size={18} />, label: "Add Product", to: "/admin/products/new" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-[#0f0f0f] text-white z-30 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
                <ShoppingBag size={18} className="text-black" />
              </div>
              <div>
                <p className="font-serif font-bold text-white text-base leading-tight">HMA-Store</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin Panel</p>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 mb-3">Navigation</p>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          <div className="pt-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 mb-3">Store</p>
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              <ExternalLink size={18} />
              View Storefront
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/products", {
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
          totalRevenue: products.reduce((sum, p) => sum + p.price, 0),
  avgPrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length),
  totalSavings: products
    .filter(p => p.isSale && p.originalPrice)
    .reduce((sum, p) => sum + (p.originalPrice - p.price), 0),
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const statCards = stats ? [
    {
      label: "Total Products", value: stats.total,
      icon: <Package size={22} />,
      bg: "bg-gradient-to-br from-black to-gray-800",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "Men's Collection", value: stats.men,
      icon: <Users size={22} />,
      bg: "bg-gradient-to-br from-blue-500 to-blue-700",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "Women's Collection", value: stats.women,
      icon: <Users size={22} />,
      bg: "bg-gradient-to-br from-pink-500 to-rose-600",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "Kids Collection", value: stats.kids,
      icon: <Users size={22} />,
      bg: "bg-gradient-to-br from-amber-400 to-orange-500",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "New Arrivals", value: stats.isNew,
      icon: <TrendingUp size={22} />,
      bg: "bg-gradient-to-br from-emerald-400 to-green-600",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "On Sale", value: stats.isSale,
      icon: <Tag size={22} />,
      bg: "bg-gradient-to-br from-red-400 to-red-600",
      text: "text-white", sub: "text-white/60"
    },
    {
      label: "AI Recommended", value: stats.aiRecommended,
      icon: <Sparkles size={22} />,
      bg: "bg-gradient-to-br from-violet-500 to-purple-700",
      text: "text-white", sub: "text-white/60"
    },
    {
  label: "Total Value",
  value: `Rs ${(stats?.totalRevenue || 0).toLocaleString()}`,
  icon: <ShoppingBag size={22} />,
  bg: "bg-gradient-to-br from-teal-500 to-cyan-600",
  text: "text-white",
  sub: "text-white/60"
},
{
  label: "Avg Price",
  value: `Rs ${(stats?.avgPrice || 0).toLocaleString()}`,
  icon: <BarChart3 size={22} />,
  bg: "bg-gradient-to-br from-slate-600 to-slate-800",
  text: "text-white",
  sub: "text-white/60"
},
{
  label: "Total Savings",
  value: `Rs ${(stats?.totalSavings || 0).toLocaleString()}`,
  icon: <Tag size={22} />,
  bg: "bg-gradient-to-br from-orange-400 to-orange-600",
  text: "text-white",
  sub: "text-white/60"
}
  ] : [];

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">

        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-serif text-2xl font-bold text-black">Dashboard</h1>
              <p className="text-xs text-gray-400">Welcome back, Admin</p>
            </div>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </header>

        <main className="flex-1 p-6 md:p-8">

          {/* Stats Grid */}
          {loading ? (
           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="rounded-2xl h-32 animate-pulse bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statCards.map((card, i) => (
                <div key={i} className={`${card.bg} rounded-2xl p-5 shadow-sm`}>
                  <div className={`${card.text} opacity-80 mb-3`}>{card.icon}</div>
                  <p className={`font-serif text-4xl font-bold ${card.text}`}>{card.value}</p>
                  <p className={`text-[11px] font-bold uppercase tracking-wider mt-1 ${card.sub}`}>{card.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-bold text-black">Quick Actions</h2>
              <BarChart3 size={18} className="text-gray-300" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/products" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-black transition-all">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">Manage Products</p>
                  <p className="text-xs text-gray-400">View, edit & delete</p>
                </div>
              </Link>

              <Link to="/admin/products/new" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 transition-all">
                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">Add New Product</p>
                  <p className="text-xs text-gray-400">Create a new listing</p>
                </div>
              </Link>

              <Link to="/" className="group flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 transition-all">
                <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ExternalLink size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">View Storefront</p>
                  <p className="text-xs text-gray-400">See live store</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Category Breakdown */}
          {stats && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-black mb-6">Category Breakdown</h2>
              <div className="space-y-4">
                {[
                  { label: "Men", value: stats.men, total: stats.total, color: "bg-blue-500" },
                  { label: "Women", value: stats.women, total: stats.total, color: "bg-pink-500" },
                  { label: "Kids", value: stats.kids, total: stats.total, color: "bg-amber-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-bold text-gray-700">{item.label}</span>
                      <span className="text-gray-400 font-medium">{item.value} products</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`${item.color} h-2.5 rounded-full transition-all duration-700`}
                        style={{ width: `${(item.value / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}