import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  Package, Plus, Search, Edit2, Trash2,
  ShoppingBag, LogOut, LayoutDashboard,
  ExternalLink, Menu, X, ChevronLeft, ChevronRight,
  ClipboardList, Activity
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
    { icon: <ClipboardList size={18} />, label: "Orders", to: "/admin/orders" },
    { icon: <Activity size={18} />, label: "Activity Log", to: "/admin/activity" },
    { icon: <Package size={18} />, label: "Products", to: "/admin/products" },
    { icon: <Plus size={18} />, label: "Add Product", to: "/admin/products/new" },
  ];

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-[#0f0f0f] text-white z-30 flex flex-col transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 border-r border-white/5`}>
        <div className="px-6 py-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <ShoppingBag size={18} className="text-black" />
            </div>
            <div>
              <p className="font-serif font-bold text-white text-base leading-tight">HMA-Store</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Admin Panel</p>
            </div>
            <button onClick={onClose} className="lg:hidden ml-auto text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
              <X size={18} />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1 overflow-y-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 px-3 mb-4">Management</p>
          {links.map((link) => (
            <Link key={link.label} to={link.to} onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm font-medium group">
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

        <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all text-sm font-medium w-full">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(1);

  const fetchProducts = () => {
    fetch(`${API_URL}/api/admin/products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, [token]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const badgeColor = (p) => {
    if (p.isNew) return "bg-green-100 text-green-700";
    if (p.isSale) return "bg-red-100 text-red-600";
    if (p.aiRecommended) return "bg-purple-100 text-purple-700";
    return "bg-gray-100 text-gray-500";
  };

  const badgeLabel = (p) => {
    if (p.isNew) return "New";
    if (p.isSale) return "Sale";
    if (p.aiRecommended) return "AI Pick";
    return "Regular";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-black">Products</h1>
              <p className="text-[10px] sm:text-xs text-gray-400">{filtered.length} products found</p>
            </div>
          </div>
          <Link to="/admin/products/new"
            className="flex items-center gap-2 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-black/20 transition-all active:scale-95">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl flex-1 border border-gray-100 focus-within:border-gray-300 transition-all">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="bg-transparent outline-none text-sm w-full text-gray-700"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {["all", "men", "women", "kids"].map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategoryFilter(cat); setPage(1); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    categoryFilter === cat
                      ? "bg-black text-white shadow-md font-extrabold"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Table / Cards Container */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Package size={40} className="text-gray-200 mb-4" />
                <p className="font-serif text-xl text-gray-400">No products found</p>
                <button onClick={() => { setSearch(""); setCategoryFilter("all"); }}
                  className="mt-4 text-sm font-bold text-black underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* DESKTOP TABLE VIEW */}
                <div className="hidden md:block">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Image</div>
                    <div className="col-span-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Product</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</div>
                    <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</div>
                    <div className="col-span-1 text-[10px] font-black uppercase tracking-widest text-gray-400">Actions</div>
                  </div>

                  {/* Table Rows */}
                  {paginated.map((product) => (
                    <div key={product._id}
                      className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center">

                      {/* Image */}
                      <div className="col-span-1">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </div>

                      {/* Name */}
                      <div className="col-span-4">
                        <p className="font-bold text-sm text-black truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">ID: {product._id.slice(-6)}</p>
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[11px] font-bold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        <p className="font-bold text-sm text-black">Rs {product.price.toLocaleString()}</p>
                        {product.isSale && product.originalPrice && (
                          <p className="text-[11px] text-gray-400 line-through">Rs {product.originalPrice.toLocaleString()}</p>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="col-span-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${badgeColor(product)}`}>
                          {badgeLabel(product)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition-all"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          disabled={deletingId === product._id}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* MOBILE CARDS VIEW */}
                <div className="md:hidden divide-y divide-gray-100">
                  {paginated.map((product) => (
                    <div key={product._id} className="p-4 flex gap-4 items-center hover:bg-gray-50/50 transition-colors">
                      {/* Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-black truncate">{product.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">ID: {product._id.slice(-6)}</p>
                        
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-[9px] font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${badgeColor(product)}`}>
                            {badgeLabel(product)}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-2 mt-2">
                          <p className="font-bold text-sm text-black">Rs {product.price.toLocaleString()}</p>
                          {product.isSale && product.originalPrice && (
                            <p className="text-[10px] text-gray-400 line-through">Rs {product.originalPrice.toLocaleString()}</p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-black hover:text-white transition-all border border-gray-200/50"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          disabled={deletingId === product._id}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-red-500 hover:text-white transition-all border border-gray-200/50 disabled:opacity-50"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-400 font-medium">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-black transition-all disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                      page === i + 1 ? "bg-black text-white" : "bg-white border border-gray-200 hover:border-black"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:border-black transition-all disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}