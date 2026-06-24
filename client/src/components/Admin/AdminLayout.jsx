import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard, Package, Plus, LogOut,
  ShoppingBag, ExternalLink, Menu, X,
  Search, Bell, UserCircle, ChevronRight,
  ClipboardList, Activity, Users, DollarSign
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
    { icon: <Users size={18} />, label: "Users", to: "/admin/users" },
    { icon: <DollarSign size={18} />, label: "Sales Revenue", to: "/admin/revenue" },
    { icon: <ClipboardList size={18} />, label: "Orders", to: "/admin/orders" },
    { icon: <Activity size={18} />, label: "Activity Log", to: "/admin/activity" },
    { icon: <Package size={18} />, label: "Products", to: "/admin/products" },
    { icon: <Plus size={18} />, label: "Add Product", to: "/admin/products/new" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] text-white z-30 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 border-r border-white/5`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5 shrink-0">
              <ShoppingBag size={18} className="text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif font-bold text-white text-base leading-tight tracking-tight truncate">HMA-Store</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Admin Panel</p>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white/40 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5 shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-3">Management</p>
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group"
            >
              <span className="group-hover:scale-110 transition-transform shrink-0">{link.icon}</span>
              {link.label}
            </Link>
          ))}

          <div className="pt-5 mt-5 border-t border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-3">Storefront</p>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <ExternalLink size={18} className="shrink-0" /> View Store
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10 bg-[#0a0a0a]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm font-medium w-full"
          >
            <LogOut size={18} className="shrink-0" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* ── TOP BAR ── */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-20 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 shrink-0 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Desktop search */}
            <div className="hidden md:flex items-center gap-3 bg-gray-100/80 px-4 py-2.5 rounded-xl w-full max-w-md border border-transparent focus-within:border-gray-300 focus-within:bg-white transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search data..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-600 placeholder:text-gray-400"
              />
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 shrink-0 transition-colors"
            >
              <Search size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="relative p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="hidden sm:block h-7 w-px bg-gray-200" />

            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-black leading-none">Super Admin</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Verified</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm ring-1 ring-gray-200 transition-transform group-hover:scale-105 shrink-0">
                <UserCircle size={22} />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile search bar (slides down) */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 py-2 bg-white border-b border-gray-100 sticky top-14.25 z-10">
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 rounded-xl border border-transparent focus-within:border-gray-300 focus-within:bg-white transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search data..."
                className="bg-transparent border-none outline-none text-sm w-full text-gray-600 placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
