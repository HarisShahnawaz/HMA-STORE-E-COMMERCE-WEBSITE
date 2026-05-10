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

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="font-serif text-xl text-gray-400 animate-pulse">Loading product...</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="font-serif text-2xl">Product not found</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-325 mx-auto px-6 pt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight size={10} />
        <Link to={`/${product.category}`} className="hover:text-black">{product.category}</Link>
        <ChevronRight size={10} />
        <span className="text-black">{product.name}</span>
      </div>

      <div className="max-w-325 mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Image Section */}
        <div className="relative">
          <div className="aspect-3/4 rounded-4xl overflow-hidden bg-[#f6f6f6]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {product.aiRecommended && (
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
               <Sparkles size={12} className="text-black" />
               <span className="text-[10px] font-black uppercase tracking-tighter">AI Pick</span>
            </div>
          )}
          
          <button className="absolute top-6 right-6 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Right: Content Section */}
        <div className="flex flex-col">
          <p className="text-[11px] font-black tracking-[0.2em] text-gray-300 uppercase mb-2">
            {product.category} Collection
          </p>
          <h1 className="font-serif text-4xl font-bold mb-4 text-black">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} />
            </div>
            <span className="text-[11px] text-gray-400 font-bold">4.0 (24 reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mb-10">
            <p className="font-serif text-3xl font-bold text-[#0f172a]">
              Rs {product.price.toLocaleString()}
            </p>
            {product.isSale && (
              <p className="text-gray-400 line-through text-lg">
                Rs {product.originalPrice?.toLocaleString()}
              </p>
            )}
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 text-[11px] font-black uppercase tracking-widest">
              <span>Select Size</span>
              <button className="text-gray-400 underline lowercase">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-11 rounded-xl border text-[11px] font-bold transition-all ${
                    selectedSize === size 
                    ? 'border-black bg-black text-white shadow-lg' 
                    : 'border-gray-100 bg-[#fbfbfb] text-gray-400 hover:border-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => addToCart({ ...product, id: product._id, size: selectedSize })}
              className="flex-1 h-14 bg-black text-white rounded-xl font-bold text-[12px] flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-black/5"
            >
              <ShoppingBag size={16} /> Add to Cart
            </button>
            <button className="flex-1 h-14 border border-gray-200 rounded-xl font-bold text-[12px] hover:bg-gray-50 transition-colors">
              Buy Now
            </button>
          </div>

          {product.aiRecommended && (
            <div className="bg-orange-50/50 border border-orange-100 p-5 rounded-2xl mb-10">
              <div className="flex items-center gap-2 text-orange-600 mb-1">
                <Sparkles size={14} />
                <p className="text-[10px] font-black uppercase tracking-widest italic">AI Recommended</p>
              </div>
              <p className="text-[11px] text-orange-800/70 leading-relaxed">
                Our AI stylist picked this based on trending styles and top customer ratings.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-12">
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-4">Product Details</h4>
            <p className="text-[12px] text-gray-500 flex items-center gap-3">
              <span className="w-1 h-1 bg-gray-300 rounded-full" /> Premium quality {product.category} wear
            </p>
            <p className="text-[12px] text-gray-500 flex items-center gap-3">
              <span className="w-1 h-1 bg-gray-300 rounded-full" /> Machine washable & Easy care
            </p>
            <p className="text-[12px] text-gray-500 flex items-center gap-3">
              <span className="w-1 h-1 bg-gray-300 rounded-full" /> Free delivery on orders over Rs 30,000
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
            <div className="text-center">
              <Truck size={20} className="mx-auto text-blue-500 mb-2" />
              <p className="text-[9px] font-bold text-gray-400 uppercase leading-tight">Free Delivery<br/>Orders over 30k</p>
            </div>
            <div className="text-center">
              <RotateCcw size={20} className="mx-auto text-blue-500 mb-2" />
              <p className="text-[9px] font-bold text-gray-400 uppercase leading-tight">Easy Returns<br/>Within 7 days</p>
            </div>
            <div className="text-center">
              <ShieldCheck size={20} className="mx-auto text-green-500 mb-2" />
              <p className="text-[9px] font-bold text-gray-400 uppercase leading-tight">Authentic<br/>100% guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}