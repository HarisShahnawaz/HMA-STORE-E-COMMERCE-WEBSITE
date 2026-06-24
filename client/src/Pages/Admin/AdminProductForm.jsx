import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  ShoppingBag, LogOut, LayoutDashboard, Package,
  Plus, ExternalLink, X, Menu, Save, ArrowLeft,
  Image, Tag, DollarSign, Layers, ClipboardList, Activity
} from "lucide-react";

function Sidebar({ open, onClose }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login"); };

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

const emptyForm = {
  name: "", price: "", originalPrice: "",
  image: "", category: "men",
  isNew: false, isSale: false, aiRecommended: false,
};

export default function AdminProductForm() {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) return;
    fetch(`${API_URL}/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || "",
          price: data.price || "",
          originalPrice: data.originalPrice || "",
          image: data.image || "",
          category: data.category || "men",
          isNew: data.isNew || false,
          isSale: data.isSale || false,
          aiRecommended: data.aiRecommended || false,
        });
        setFetching(false);
      })
      .catch(() => setFetching(false));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ── Toggle handler — clean and separate ──
  const handleToggle = (name) => {
    setForm(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    };

    try {
      const url = isEditing
        ? `${API_URL}/api/admin/products/${id}`
        : `${API_URL}/api/admin/products`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save product");
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const imageCategories = {
    men: ["belt","black-hoodie","black-jacket","blazer","blazer2","chinos","denim-jacket","hoodie","oxford","polo","polo2","poloshirt","scarf","shirt","shirt2","sweater","tee","tee2","trouser-shirtset","trousers","trousershirt-2","trousershirt3","vest","woolshirt"],
    women: ["bag","bag2","blouse","cardigan","coat","dress","dress2","ear-ring","earrings","jeans","scarf","shawl","silky3","skirt","sweater","trousers","womenbag","womencoat2","womendress4","womensilkydress2","wrap-dress"],
    kids: ["beanie","brown-jacket","cardigan","dress","hoodie","jacket","joggers","kid-frauk","kid-hoodie","kid-shoes","kid-trouser","kids-jacket2","kids-set2","kidset-2","kidset","kidshirt","leggings","puffer","raincoat","set","sneakers","tshirt"],
  };

  const toggles = [
    { name: "isNew", label: "New Arrival", desc: "Shows 'New' badge", color: "bg-green-500" },
    { name: "isSale", label: "On Sale", desc: "Shows 'Sale' badge", color: "bg-red-500" },
    { name: "aiRecommended", label: "AI Recommended", desc: "Shows 'AI Pick' badge", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <button onClick={() => navigate("/admin/products")}
              className="flex items-center gap-1.5 text-gray-400 hover:text-black transition-colors text-sm font-medium">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <div>
              <h1 className="font-serif text-lg sm:text-2xl font-bold text-black">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {isEditing ? "Update product details" : "Create a new product listing"}
              </p>
            </div>
          </div>
          <button onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-black/20 transition-all active:scale-95 disabled:opacity-50 shrink-0">
            <Save size={16} />
            <span className="hidden sm:inline">{loading ? "Saving..." : "Save Product"}</span>
            <span className="sm:hidden">{loading ? "Saving..." : "Save"}</span>
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {fetching ? (
            <div className="flex items-center justify-center py-32">
              <p className="font-serif text-xl text-gray-400 animate-pulse">Loading product...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-5 py-4 rounded-2xl mb-6">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Basic Info */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <Layers size={16} className="text-gray-400" />
                      <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400">Basic Info</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                          Product Name *
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Premium Leather Belt"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors bg-white"
                        >
                          <option value="men">Men</option>
                          <option value="women">Women</option>
                          <option value="kids">Kids</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <DollarSign size={16} className="text-gray-400" />
                      <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400">Pricing</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                          Sale Price (Rs) *
                        </label>
                        <input
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={handleChange}
                          required
                          min="0"
                          placeholder="e.g. 4500"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                          Original Price (Rs)
                        </label>
                        <input
                          name="originalPrice"
                          type="number"
                          value={form.originalPrice}
                          onChange={handleChange}
                          min="0"
                          placeholder="e.g. 6000 (optional)"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">Only needed for sale items</p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <Image size={16} className="text-gray-400" />
                      <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400">Image</h2>
                    </div>
                    <div>
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 block mb-2">
                        Image Path *
                      </label>
                      <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        required
                        placeholder="/images/products/men/belt.jpg"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-black transition-colors font-mono"
                      />
                      <p className="text-[10px] text-gray-400 mt-2">
                        Format: /images/products/category/filename.jpg
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3">
                        Quick Pick — {form.category} images
                      </p>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                        {(imageCategories[form.category] || []).map(img => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setForm(prev => ({
                              ...prev,
                              image: `/images/products/${form.category}/${img}.jpg`
                            }))}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              form.image === `/images/products/${form.category}/${img}.jpg`
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                          >
                            {img}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">

                  {/* ── Status Toggles — FIXED ── */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                      <Tag size={16} className="text-gray-400" />
                      <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400">Status</h2>
                    </div>
                    <div className="space-y-3">
                      {toggles.map(toggle => (
                        <div
                          key={toggle.name}
                          onClick={() => handleToggle(toggle.name)}
                          className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-300 cursor-pointer transition-all select-none"
                        >
                          <div>
                            <p className="font-bold text-sm text-black">{toggle.label}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">{toggle.desc}</p>
                          </div>
                          {/* Toggle pill */}
                          <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${form[toggle.name] ? toggle.color : "bg-gray-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${form[toggle.name] ? "translate-x-6" : "translate-x-1"}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Preview</h2>
                    <div className="bg-gray-50 rounded-xl overflow-hidden">
                      <div className="aspect-square relative">
                        {form.image ? (
                          <img
                            src={form.image}
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={e => { e.target.style.display = "none"; }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center min-h-32">
                            <Image size={32} className="text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          {form.isNew && (
                            <span className="bg-black text-white text-[9px] font-bold px-2 py-1 rounded-md">New</span>
                          )}
                          {form.isSale && !form.isNew && (
                            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-md">Sale</span>
                          )}
                          {form.aiRecommended && !form.isNew && !form.isSale && (
                            <span className="bg-white text-black text-[9px] font-bold px-2 py-1 rounded-md border">AI Pick</span>
                          )}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-sm text-black truncate">{form.name || "Product Name"}</p>
                        <p className="text-[10px] text-gray-400 uppercase">{form.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="font-black text-sm">Rs {Number(form.price || 0).toLocaleString()}</p>
                          {form.isSale && form.originalPrice && (
                            <p className="text-[11px] text-gray-400 line-through">
                              Rs {Number(form.originalPrice).toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-black text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
                  </button>

                  {isEditing && (
                    <Link
                      to="/admin/products"
                      className="w-full h-12 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-500"
                    >
                      Cancel
                    </Link>
                  )}
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}