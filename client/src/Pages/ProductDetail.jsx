import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  ShoppingBag, Star, ShieldCheck, Truck, 
  RotateCcw, Heart, ChevronRight, Sparkles 
} from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the API URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    
    // Updated to use dynamic API_URL
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => { 
        setProduct(data); 
        setLoading(false); 
      })
      .catch(err => { 
        setError(err.message); 
        setLoading(false); 
      });
  }, [id, API_URL]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-serif text-xl text-gray-400 animate-pulse">Loading product details...</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-2xl mb-4 text-slate-900">Product not found</h2>
        <Link to="/" className="text-sm font-bold uppercase tracking-widest text-blue-600 hover:underline">
          Return to Shop
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={10} />
        <Link to={`/${product.category}`} className="hover:text-black transition-colors">{product.category}</Link>
        <ChevronRight size={10} />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Image Section */}
        <div className="relative group">
          <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-[#f6f6f6] border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </div>
          
          {product.aiRecommended && (
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm border border-white/20">
               <Sparkles size={12} className="text-violet-600" />
               <span className="text-[10px] font-black uppercase tracking-tighter">AI Curated Pick</span>
            </div>
          )}
          
          <button className="absolute top-6 right-6 h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-50 hover:text-rose-500 transition-all active:scale-90">
            <Heart size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Right: Content Section */}
        <div className="flex flex-col">
          <p className="text-[11px] font-black tracking-[0.2em] text-gray-300 uppercase mb-3">
            HMA Exclusive • {product.category}
          </p>
          <h1 className="font-serif text-5xl font-bold mb-6 text-black tracking-tight leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-10">
            <div className="flex text-amber-400">
              {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} className="text-gray-200" />
            </div>
            <span className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">Verified Quality • 24 Reviews</span>
          </div>

          <div className="flex items-baseline gap-4 mb-12">
            <p className="font-serif text-4xl font-bold text-black tracking-tighter">
              Rs {product.price.toLocaleString()}
            </p>
            {product.isSale && (
              <p className="text-gray-300 line-through text-xl font-medium">
                Rs {product.originalPrice?.toLocaleString()}
              </p>
            )}
          </div>

          {/* Size Selector */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-5 text-[11px] font-black uppercase tracking-widest">
              <span>Select Size</span>
              <button className="text-zinc-400 hover:text-black transition-colors underline decoration-zinc-200 underline-offset-4">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-12 rounded-2xl border text-[11px] font-bold transition-all duration-300 ${
                    selectedSize === size 
                    ? 'border-black bg-black text-white shadow-xl shadow-black/20' 
                    : 'border-gray-100 bg-[#fbfbfb] text-gray-400 hover:border-gray-300 hover:bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={() => addToCart({ ...product, id: product._id, size: selectedSize })}
              className="flex-[2] h-16 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 hover:bg-zinc-800 active:scale-[0.98] transition-all shadow-2xl shadow-black/10"
            >
              <ShoppingBag size={18} /> Add to bag
            </button>
            <button className="flex-1 h-16 border-2 border-zinc-100 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] hover:bg-zinc-50 hover:border-zinc-200 transition-all">
              Wishlist
            </button>
          </div>

          {product.aiRecommended && (
            <div className="bg-zinc-900 rounded-[2rem] p-8 mb-12 relative overflow-hidden text-white">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-violet-400 mb-3">
                  <Sparkles size={16} />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Stylist Insight</p>
                </div>
                <p className="text-[12px] text-zinc-400 leading-relaxed max-w-sm font-medium">
                  Chosen by our AI engine as a high-value piece. Pairs exceptionally well with our latest denim collection.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            </div>
          )}

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-10">
            <TrustBadge icon={<Truck size={20} className="text-black" />} title="Fast Delivery" />
            <TrustBadge icon={<RotateCcw size={20} className="text-black" />} title="7-Day Return" />
            <TrustBadge icon={<ShieldCheck size={20} className="text-black" />} title="Authentic" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBadge({ icon, title }) {
  return (
    <div className="text-center p-4 rounded-3xl hover:bg-gray-50 transition-colors group">
      <div className="mb-3 flex justify-center group-hover:-translate-y-1 transition-transform">
        {icon}
      </div>
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-tight">{title}</p>
    </div>
  );
}