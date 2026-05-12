import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { 
  LayoutDashboard, Package, Plus, ArrowLeft, Save, 
  Image as ImageIcon, ExternalLink, LogOut, ChevronRight
} from "lucide-react";

export default function AdminProductForm() {
  const { token, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "MEN",
    image: "",
    isNew: true,
    isSale: false,
    aiRecommended: false,
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) navigate("/admin/products");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] flex font-sans">
      {/* SIDEBAR - Matched to image_d27394.jpg */}
      <aside className="fixed top-0 left-0 h-screen w-65 bg-[#0c0c0c] text-[#8e8e8e] flex flex-col border-r border-white/5">
        <div className="p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Package size={22} className="text-black" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">HMA-Store</h2>
              <p className="text-[10px] uppercase tracking-widest opacity-50">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest px-4 mb-4 opacity-30">Management</p>
          <Link to="/admin/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:text-white transition-all">
            <LayoutDashboard size={20} /> <span className="text-[15px]">Dashboard</span>
          </Link>
          <Link to="/admin/products" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:text-white transition-all">
            <Package size={20} /> <span className="text-[15px]">Products</span>
          </Link>
          <Link to="/admin/products/new" className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white/5 text-white shadow-sm transition-all">
            <Plus size={20} /> <span className="text-[15px]">Add Product</span>
          </Link>

          <div className="pt-8">
            <p className="text-[10px] font-bold uppercase tracking-widest px-4 mb-4 opacity-30">Storefront</p>
            <Link to="/" className="flex items-center gap-4 px-4 py-3 rounded-lg hover:text-white transition-all">
              <ExternalLink size={20} /> <span className="text-[15px]">View Store</span>
            </Link>
          </div>
        </nav>

        <button onClick={logout} className="m-4 flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all border-t border-white/5">
          <LogOut size={20} /> <span className="text-[15px]">Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-65 flex flex-col">
        {/* TOP BAR - Matched to image_d27375.jpg */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-100">
             <span className="text-gray-400">🔍</span>
             <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-black">Super Admin</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified</p>
            </div>
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white border-4 border-gray-100">
               <span className="text-xl">👤</span>
            </div>
          </div>
        </header>

        <main className="p-10">
          {/* HEADER SECTION */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black font-serif">Add New Product</h1>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                <span>Products</span> <ChevronRight size={14} /> <span>New Collection</span>
              </div>
            </div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-black font-bold text-sm uppercase tracking-widest transition-all">
               <ArrowLeft size={18} /> Back to List
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE: PRODUCT DETAILS */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">General Information</h3>
                <div className="space-y-5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Product Name</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Enter product title" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-medium" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="6" placeholder="Write about the fabric, fit, and style..." 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-medium resize-none" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6">Pricing & Inventory</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Sale Price (Rs)</label>
                    <input required name="price" value={formData.price} onChange={handleChange} type="number" placeholder="4500" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Original Price (Rs)</label>
                    <input name="originalPrice" value={formData.originalPrice} onChange={handleChange} type="number" placeholder="5000" 
                      className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-black outline-none transition-all font-bold text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: CATEGORY & IMAGE */}
            <div className="space-y-6">
              <div className="bg-white rounded-[30px] p-6 shadow-sm border border-gray-100">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">Product Image</label>
                <div className="w-full aspect-square rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group">
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={40} className="text-gray-200 mx-auto mb-2" />
                      <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">No Preview Available</p>
                    </div>
                  )}
                </div>
                <input required name="image" value={formData.image} onChange={handleChange} type="text" placeholder="Paste Image URL here" 
                  className="w-full mt-4 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-xs outline-none focus:border-black transition-all" />
              </div>

              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
                <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">Collection</label>
                <select name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none outline-none font-bold uppercase tracking-widest text-sm cursor-pointer hover:bg-gray-100 transition-all">
                  <option value="MEN">Men</option>
                  <option value="WOMEN">Women</option>
                  <option value="KIDS">Kids</option>
                </select>
              </div>

              {/* ACTION BUTTON - Matched to "+ Add Product" button in image_d27394.jpg */}
              <button disabled={loading} type="submit" 
                className="w-full bg-black text-white py-5 rounded-3xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-black/20 transition-all active:scale-95 disabled:opacity-50">
                {loading ? "Publishing..." : <><Save size={20} /> Publish Product</>}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}