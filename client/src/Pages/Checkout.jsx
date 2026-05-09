import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { ChevronLeft, Lock, Truck, CreditCard, CheckCircle2 } from "lucide-react";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });

  const shippingFee = 500;
  const freeShippingThreshold = 30000;
  const finalTotal = cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + shippingFee;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (clearCart) clearCart();
    setIsOrdered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isOrdered) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-black mb-4 text-[#0f172a]">Order Placed!</h1>
        <p className="text-gray-500 text-lg mb-1">
          Thank you, <span className="font-bold text-black">{formData.firstName}</span>!
        </p>
        <p className="text-gray-400 text-sm mb-12">Your order will be delivered soon.</p>
        <Link to="/" className="h-14 px-12 bg-[#0f172a] text-white rounded-full font-bold flex items-center">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-10">
      <div className="max-w-300 mx-auto px-6 md:px-12">
        
        {/* Breadcrumb style back link */}
        <Link to="/cart" className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-10">
          <ChevronLeft size={14} /> Back to Cart
        </Link>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-black mb-10">Shipping Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input 
                  required 
                  placeholder="First Name" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="h-16 bg-[#fbfbfb] border border-gray-100 rounded-[1.2rem] px-8 outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all" 
                />
                <input 
                  required 
                  placeholder="Last Name" 
                  className="h-16 bg-[#fbfbfb] border border-gray-100 rounded-[1.2rem] px-8 outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all" 
                />
                <input 
                  required 
                  placeholder="Address" 
                  className="md:col-span-2 h-16 bg-[#fbfbfb] border border-gray-100 rounded-[1.2rem] px-8 outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all" 
                />
                <input 
                  required 
                  placeholder="Phone Number" 
                  className="md:col-span-2 h-16 bg-[#fbfbfb] border border-gray-100 rounded-[1.2rem] px-8 outline-none focus:bg-white focus:ring-1 focus:ring-black/5 transition-all" 
                />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-black mb-6">Payment Method</h2>
              <div className="p-6 bg-white border-2 border-black rounded-3xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-[6px] border-black" />
                  <span className="font-bold text-sm">Cash on Delivery</span>
                </div>
                <Truck size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Right Side: The Floating Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-50 rounded-[3rem] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sticky top-28">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block mb-12">Summary</span>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black font-bold">Rs {cartTotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Shipping</span>
                  <span className="text-black font-bold">Rs {cartTotal >= freeShippingThreshold ? "0" : shippingFee}</span>
                </div>

                <div className="flex justify-between items-center pt-8 border-t border-gray-50">
                  <span className="font-serif text-2xl font-black">Total</span>
                  <span className="font-serif text-3xl font-black text-[#0f172a]">
                    Rs {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full h-16 bg-[#0f172a] text-white rounded-2xl mt-12 flex items-center justify-center gap-3 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
              >
                <CreditCard size={18} />
                <span className="font-bold text-sm uppercase tracking-widest">Complete Order</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}