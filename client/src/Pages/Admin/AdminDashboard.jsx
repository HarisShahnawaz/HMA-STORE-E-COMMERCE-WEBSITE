import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard, Package, Plus, LogOut,
  ShoppingBag, TrendingUp, Tag, Sparkles,
  Users, BarChart3, ExternalLink, Menu, X,
  Search, Bell, UserCircle
} from "lucide-react";

function Sidebar({ open, onClose }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  // Only keeping your active routes
  const links = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", to: "/admin/dashboard" },
    { icon: <Package size={18} />, label: "Products", to: "/admin/products" },
    { icon: <Plus size={18} />, label: "Add Product", to: "/admin/products/new" },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />}

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] text-white z-30 flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-r border-white/5`}>
        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5">
              <ShoppingBag size={18} className="text-black" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-base leading-tight tracking-tight">HMA-Store</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Admin Panel</p>
            </div>
            <button onClick={onClose} className="lg:hidden ml-auto text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation - overflow hidden to prevent the ugly scrollbar */}
        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto no-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-4">Management</p>
          {links.map((link) => (
            <Link 
              key={link.label} 
              to={link.to} 
              onClick={onClose} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group"
            >
              <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          
          <div className="pt-6 mt-6 border-t border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-4">Storefront</p>
            <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              <ExternalLink size={18} /> View Store
            </Link>
          </div>
        </nav>

        {/* Logout Bottom Section */}
        <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm font-medium w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    usersCount: 0,
    ordersCount: 0,
    totalRevenue: 0,
    orders: [],
    activities: []
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`${API_URL}/api/admin/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json())
    ])
      .then(([products, dbStats]) => {
        setStats({
          total: products.length,
          men: products.filter(p => p.category === "men").length,
          women: products.filter(p => p.category === "women").length,
          kids: products.filter(p => p.category === "kids").length,
          isNew: products.filter(p => p.isNew).length,
          isSale: products.filter(p => p.isSale).length,
          aiRecommended: products.filter(p => p.aiRecommended).length,
          totalRevenue: products.reduce((sum, p) => sum + p.price, 0),
          avgPrice: products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0,
          totalSavings: products.filter(p => p.isSale && p.originalPrice).reduce((sum, p) => sum + (p.originalPrice - p.price), 0),
        });
        setDashboardData({
          usersCount: dbStats.usersCount || 0,
          ordersCount: dbStats.ordersCount || 0,
          totalRevenue: dbStats.totalRevenue || 0,
          orders: dbStats.orders || [],
          activities: dbStats.activities || []
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  // Stat cards exactly as you like them + users & orders
  const statCards = stats ? [
    { label: "Total Products", value: stats.total, icon: <Package size={22} />, bg: "bg-gradient-to-br from-black to-gray-800", text: "text-white", sub: "text-white/60" },
    { label: "Registered Users", value: dashboardData.usersCount, icon: <Users size={22} />, bg: "bg-gradient-to-br from-indigo-500 to-indigo-700", text: "text-white", sub: "text-white/60" },
    { label: "Total Orders", value: dashboardData.ordersCount, icon: <ShoppingBag size={22} />, bg: "bg-gradient-to-br from-purple-500 to-purple-700", text: "text-white", sub: "text-white/60" },
    { label: "Sales Revenue", value: `Rs ${(dashboardData.totalRevenue || 0).toLocaleString()}`, icon: <TrendingUp size={22} />, bg: "bg-gradient-to-br from-teal-500 to-cyan-600", text: "text-white", sub: "text-white/60" },
    { label: "Men's Collection", value: stats.men, icon: <Users size={22} />, bg: "bg-gradient-to-br from-blue-500 to-blue-700", text: "text-white", sub: "text-white/60" },
    { label: "Women's Collection", value: stats.women, icon: <Users size={22} />, bg: "bg-gradient-to-br from-pink-500 to-rose-600", text: "text-white", sub: "text-white/60" },
    { label: "Kids Collection", value: stats.kids, icon: <Users size={22} />, bg: "bg-gradient-to-br from-amber-400 to-orange-500", text: "text-white", sub: "text-white/60" },
    { label: "New Arrivals", value: stats.isNew, icon: <TrendingUp size={22} />, bg: "bg-gradient-to-br from-emerald-400 to-green-600", text: "text-white", sub: "text-white/60" },
    { label: "On Sale", value: stats.isSale, icon: <Tag size={22} />, bg: "bg-gradient-to-br from-red-400 to-red-600", text: "text-white", sub: "text-white/60" },
    { label: "AI Recommended", value: stats.aiRecommended, icon: <Sparkles size={22} />, bg: "bg-gradient-to-br from-violet-500 to-purple-700", text: "text-white", sub: "text-white/60" },
  ] : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* NEW PROFESSIONAL TOP BAR */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 sm:gap-6 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <Menu size={20} />
            </button>
            
            {/* Search fills the gap nicely */}
            <div className="hidden md:flex items-center gap-3 bg-gray-100/80 px-4 py-2.5 rounded-xl w-full max-w-md border border-transparent focus-within:border-gray-300 focus-within:bg-white transition-all">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-sm w-full text-gray-600" />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button className="relative p-2.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-gray-200"></div>

            <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-black leading-none">Super Admin</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Verified</p>
              </div>
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm ring-1 ring-gray-200 transition-transform group-hover:scale-105">
                <UserCircle size={24} />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-10">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">Overview</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Snapshot of your store's current status.</p>
            </div>
            <Link to="/admin/products/new" className="w-fit flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-black/20 transition-all active:scale-95">
              <Plus size={18} /> Add New Product
            </Link>
          </div>

          {/* Stats Grid - 5 columns for symmetry */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-10">
              {[...Array(10)].map((_, i) => <div key={i} className="h-28 sm:h-36 rounded-2xl bg-gray-200 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-10">
              {statCards.map((card, i) => (
                <div key={i} className={`${card.bg} rounded-2xl p-4 sm:p-6 shadow-sm hover:scale-[1.03] transition-all duration-300`}>
                  <div className={`${card.text} opacity-70 mb-2 sm:mb-4`}>{card.icon}</div>
                  <p className={`font-serif text-lg sm:text-2xl lg:text-3xl font-bold ${card.text} truncate`} title={String(card.value)}>{card.value}</p>
                  <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-widest mt-1.5 sm:mt-2 ${card.sub} truncate`}>{card.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Quick Actions (Unchanged) */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-xl font-bold text-black">Management Actions</h2>
              <div className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Access</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/admin/products" className="group flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-black hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <Package size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">Manage Products</p>
                  <p className="text-xs text-gray-400 mt-0.5">View, Edit & Delete products</p>
                </div>
              </Link>

              <Link to="/admin/products/new" className="group flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-green-500 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <Plus size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">Add New Product</p>
                  <p className="text-xs text-gray-400 mt-0.5">Create a new listing</p>
                </div>
              </Link>

              <Link to="/" className="group flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-blue-500 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm text-black">Live View</p>
                  <p className="text-xs text-gray-400 mt-0.5">Preview customer site</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Live Activity Feed and Recent Orders */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6 sm:mb-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-lg font-bold text-black">Recent Orders</h2>
                <span className="px-2.5 py-1 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-lg uppercase tracking-wider">
                  Latest {dashboardData.orders.length} orders
                </span>
              </div>
              <div className="flex-1 overflow-x-auto">
                {dashboardData.orders.length === 0 ? (
                  <p className="text-sm text-gray-400 py-8 text-center">No orders placed yet.</p>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 uppercase font-black tracking-wider">
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Items</th>
                        <th className="pb-3 font-semibold text-right">Total</th>
                        <th className="pb-3 font-semibold text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.orders.slice(0, 5).map((order) => (
                        <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 font-bold text-gray-800">
                            <div>{order.userName}</div>
                            <div className="text-[10px] text-gray-400 font-medium">{order.userEmail}</div>
                          </td>
                          <td className="py-3 text-gray-500">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </td>
                          <td className="py-3 font-bold text-black text-right">
                            Rs {order.total.toLocaleString()}
                          </td>
                          <td className="py-3 text-gray-400 text-right">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-lg font-bold text-black">Recent Activity</h2>
                <span className="px-2.5 py-1 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-lg uppercase tracking-wider">
                  Live Feed
                </span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-72 pr-1 space-y-4 no-scrollbar">
                {dashboardData.activities.length === 0 ? (
                  <p className="text-sm text-gray-400 py-8 text-center">No activities recorded yet.</p>
                ) : (
                  dashboardData.activities.slice(0, 5).map((activity) => {
                    let badgeColor = "bg-gray-100 text-gray-600";
                    if (activity.action === "signup") badgeColor = "bg-emerald-50 text-emerald-600 border border-emerald-100";
                    if (activity.action === "login") badgeColor = "bg-blue-50 text-blue-600 border border-blue-100";
                    if (activity.action === "order") badgeColor = "bg-amber-50 text-amber-600 border border-amber-100";

                    return (
                      <div key={activity._id} className="flex gap-4 items-start p-3 rounded-xl border border-gray-50 hover:bg-gray-50/50 transition-all">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md shrink-0 ${badgeColor}`}>
                          {activity.action}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-800 leading-tight">{activity.userName}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5 leading-normal">{activity.details}</p>
                          <span className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider block mt-1">
                            {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(activity.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Category Breakdown (Unchanged) */}
          {stats && (
            <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-black mb-8">Stock Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { label: "Men", value: stats.men, total: stats.total, color: "bg-blue-500" },
                  { label: "Women", value: stats.women, total: stats.total, color: "bg-pink-500" },
                  { label: "Kids", value: stats.kids, total: stats.total, color: "bg-amber-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="font-bold text-gray-700 uppercase tracking-widest text-[11px]">{item.label}</span>
                      <span className="text-black font-bold">{Math.round((item.value / item.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-inner shadow-black/10`}
                        style={{ width: `${(item.value / item.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">{item.value} Units Available</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global CSS for no scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}