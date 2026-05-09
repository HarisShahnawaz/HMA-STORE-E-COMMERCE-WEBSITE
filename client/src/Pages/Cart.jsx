import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import ProductCard from "../components/Products/productCard";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, RotateCcw, CheckCircle2, Ticket } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const shippingFee = 500;
  const freeShippingThreshold = 30000;

  const suggestedProducts = products.slice(0, 4);

  const SuggestionsSection = () => (
    <div className="mt-20 mb-10 border-t border-gray-100 pt-16">
      <div className="flex flex-col items-start mb-8">
        <p className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gray-300 mb-1">You Might Like</p>
        <h2 className="font-serif text-3xl font-black text-[#0f172a]">Suggested For You</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {suggestedProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbfbfb]">
        <div className="max-w-360 mx-auto px-5 md:px-12 py-20">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100/50 rounded-2xl flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-gray-200" strokeWidth={1} />
            </div>
            <h1 className="font-serif text-3xl font-black text-black mb-2">Your cart is empty</h1>
            <p className="text-gray-400 text-sm mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/">
              <Button className="bg-[#0f172a] text-white px-10 h-12 rounded-xl font-bold transition-all hover:opacity-90">
                Continue Shopping
              </Button>
            </Link>
          </div>
          <SuggestionsSection />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfb] pb-20">
      <div className="max-w-360 mx-auto px-5 md:px-12 pt-12">
        
        {/* Breadcrumb style Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-gray-300 mb-2">Your Selection</p>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-[#0f172a]">Shopping Cart</h1>
          <div className="w-10 h-0.5 bg-black mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((item) => (
  <div key={item.id} className="bg-white border border-gray-100 rounded-3xl md:rounded-4xl p-3 md:p-7 flex gap-3 md:gap-6 shadow-sm">
    {/* Product Image: Smaller on mobile (w-20 vs md:w-40) */}
    <div className="w-20 h-24 md:w-40 md:h-44 bg-[#f6f6f6] rounded-xl md:rounded-2xl overflow-hidden shrink-0">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>
    
    <div className="flex flex-col justify-between flex-1 py-0.5">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[8px] md:text-[10px] font-sans font-black uppercase tracking-widest text-gray-300 mb-1">
            {item.category || "Tops"}
          </p>
          <h3 className="font-serif text-sm md:text-xl font-bold text-black leading-tight">
            {item.name}
          </h3>
        </div>
        <button onClick={() => removeFromCart(item.id)} className="text-gray-200 hover:text-red-500 transition-colors">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-end justify-between gap-2 mt-2">
        {/* Compact Quantity Controls for mobile */}
        <div className="flex items-center bg-gray-50/50 rounded-lg px-1 py-1 border border-gray-100 scale-90 md:scale-100 origin-left">
          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-md transition-all">
            <Minus size={12} />
          </button>
          <span className="w-8 text-center font-sans font-bold text-[12px] md:text-sm">
            {item.quantity}
          </span>
          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-white rounded-md transition-all">
            <Plus size={12} />
          </button>
        </div>
        <p className="font-serif font-black text-sm md:text-xl text-[#0f172a]">
          Rs {item.price.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
))}
            
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-bold text-gray-400 hover:text-black transition-colors ml-4 mt-6">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm sticky top-28">
              <h2 className="text-[11px] font-sans font-black uppercase tracking-[0.2em] text-gray-300 mb-8">Order Summary</h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-400 font-medium">Subtotal</span>
                  <span className="text-black font-black">Rs {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-400 font-medium">Shipping</span>
                  <span className="text-black font-black">Rs {cartTotal >= freeShippingThreshold ? "0" : shippingFee}</span>
                </div>
                <p className="text-[10px] text-gray-300 leading-relaxed">
                  Free shipping on orders over Rs {freeShippingThreshold.toLocaleString()}
                </p>
              </div>

              {/* Coupon Input */}
              <div className="relative mb-2">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                  <Ticket size={16} />
                </div>
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="w-full h-12 bg-gray-50/50 border border-gray-100 rounded-xl pl-11 pr-24 text-sm focus:outline-none focus:ring-1 focus:ring-black/5"
                />
                <button className="absolute right-1.5 top-1.5 h-9 px-5 bg-[#0f172a] text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all hover:bg-black">
                  Apply
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-300 mb-8 ml-1">Try: <span className="text-gray-400">HMA10</span></p>

              <div className="pt-8 border-t border-gray-100 flex justify-between items-baseline mb-8">
                <span className="font-serif text-2xl font-black">Total</span>
                <span className="font-serif text-2xl font-black text-[#0f172a]">
                  Rs {(cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + shippingFee).toLocaleString()}
                </span>
              </div>

              <Button className="w-full h-14 bg-[#0f172a] text-white rounded-2xl flex items-center justify-center gap-3 group shadow-lg shadow-black/5">
                <span className="font-bold text-sm">Proceed to Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex justify-center items-center gap-6 mt-8">
                <div className="flex items-center gap-1.5 opacity-40">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">Secure</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-40">
                  <RotateCcw size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">Free Returns</span>
                </div>
                <div className="flex items-center gap-1.5 opacity-40">
                  <CheckCircle2 size={14} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SuggestionsSection />
      </div>
    </div>
  );
}