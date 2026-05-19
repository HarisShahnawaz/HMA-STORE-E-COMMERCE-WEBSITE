import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, CreditCard, ShoppingBag } from "lucide-react";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirm

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Coupon logic
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // Store final order summary before clearing cart
  const [placedOrderSummary, setPlacedOrderSummary] = useState(null);

  const shippingFee = 500;
  const freeShippingThreshold = 30000;

  const handleApplyCoupon = () => {
    if (couponInput.toUpperCase() === "HMA10") {
      setCouponCode("HMA10");
      setDiscountAmount(cartTotal * 0.1); // 10% discount
    } else {
      alert("Invalid coupon code");
      setCouponInput("");
      setCouponCode("");
      setDiscountAmount(0);
    }
  };

  const finalShipping = cartTotal >= freeShippingThreshold ? 0 : shippingFee;
  const finalTotal = cartTotal - discountAmount + finalShipping;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setPlacedOrderSummary({
        cartTotal,
        discountAmount,
        couponCode,
        finalShipping,
        finalTotal
      });
      if (clearCart) clearCart();
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 size={48} className="text-green-500" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-black mb-4 text-[#0f172a]">Order Placed!</h1>
        <p className="text-gray-500 text-lg mb-1">
          Thank you, <span className="font-bold text-black">{formData.fullName}</span>!
        </p>
        <p className="text-gray-400 text-sm mb-12">We'll contact you on <span className="font-bold">{formData.phone}</span> to confirm delivery.</p>

        <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-md w-full mb-10 shadow-sm text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-6">Order Summary</span>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Items</span>
              <span className="text-black font-bold">Rs {placedOrderSummary?.cartTotal.toLocaleString()}</span>
            </div>
            {placedOrderSummary?.discountAmount > 0 && (
              <div className="flex justify-between items-center text-sm text-green-500">
                <span>Discount ({placedOrderSummary?.couponCode})</span>
                <span className="font-bold">-Rs {placedOrderSummary?.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Shipping</span>
              <span className="text-black font-bold">Rs {placedOrderSummary?.finalShipping}</span>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg text-black">Rs {placedOrderSummary?.finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Link to="/" className="h-14 px-12 bg-[#0f172a] text-white rounded-full font-bold flex items-center shadow-xl hover:bg-black transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Stepper */}
        <div className="mb-16 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-2">Almost there</span>
          <h1 className="font-serif text-4xl font-black text-[#0f172a] mb-10">Checkout</h1>

          <div className="flex items-center justify-center max-w-lg mx-auto relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 h-0.5 bg-black transition-all duration-500 -z-10" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />

            <div className="flex justify-between w-full">
              <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 transition-colors ${step >= 1 ? 'border-black text-black' : 'border-gray-200'}`}>
                  {step > 1 ? <CheckCircle2 size={20} /> : <MapPin size={20} />}
                </div>
                <span className="text-xs font-bold">Shipping</span>
              </div>
              <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 transition-colors ${step >= 2 ? 'border-black text-black' : 'border-gray-200'}`}>
                  {step > 2 ? <CheckCircle2 size={20} /> : <CreditCard size={20} />}
                </div>
                <span className="text-xs font-bold">Payment</span>
              </div>
              <div className={`flex flex-col items-center gap-2 ${step >= 3 ? 'text-black' : 'text-gray-400'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 transition-colors ${step >= 3 ? 'border-black text-black' : 'border-gray-200'}`}>
                  <ShoppingBag size={20} />
                </div>
                <span className="text-xs font-bold">Confirm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Side: Forms */}
          <div className="lg:col-span-7">
            <form onSubmit={handleNextStep} className="bg-white border border-gray-100 rounded-4xl p-8 md:p-10 shadow-sm">

              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="font-serif text-2xl font-black mb-8">Shipping Address</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Full Name</label>
                      <input
                        required
                        placeholder="e.g. Haris Shahnawaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-5 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Phone Number</label>
                      <input
                        required
                        placeholder="e.g. 0300-1234567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-5 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Street Address</label>
                      <input
                        required
                        placeholder="House no, Street, Area"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-5 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">City</label>
                      <input
                        required
                        placeholder="e.g. Lahore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-5 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Province</label>
                      <select
                        required
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                        className="w-full h-14 bg-white border border-gray-200 rounded-xl px-5 outline-none focus:border-black focus:ring-1 focus:ring-black transition-all appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Islamabad">Islamabad</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-14 bg-black text-white rounded-xl mt-10 font-bold flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-all"
                  >
                    Continue to Payment &rarr;
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="font-serif text-2xl font-black mb-8">Payment Method</h2>

                  <div className="space-y-4">
                    {[
                      { id: "Cash on Delivery", desc: "Pay when your order arrives" },
                      { id: "JazzCash", desc: "Send to 0300-XXXXXXX" },
                      { id: "EasyPaisa", desc: "Send to 0300-XXXXXXX" },
                      { id: "Bank Transfer", desc: "Account details sent via SMS" }
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === method.id ? 'border-black bg-gray-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="hidden"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === method.id ? 'border-black' : 'border-gray-300'}`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                        </div>
                        <div>
                          <span className="font-bold block text-sm">{method.id}</span>
                          <span className="text-xs text-gray-500">{method.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 h-14 bg-white text-black border-2 border-gray-200 rounded-xl font-bold hover:border-black transition-all"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-14 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition-all shadow-xl"
                    >
                      Place Order &rarr;
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side: The Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-4xl p-8 md:p-10 shadow-sm sticky top-28">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 block mb-8">Order Summary</span>

              <div className="max-h-60 overflow-y-auto pr-2 mb-8 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder="Coupon code (Try HMA10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 h-12 bg-gray-50 border border-gray-200 rounded-lg px-4 text-sm outline-none focus:border-black transition-all uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="h-12 px-6 bg-black text-white rounded-lg text-sm font-bold hover:bg-[#1a1a1a] transition-all"
                >
                  Apply
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-black font-bold">Rs {cartTotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-sm text-green-500">
                    <span>Discount ({couponCode})</span>
                    <span className="font-bold">-Rs {discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="text-black font-bold">Rs {finalShipping}</span>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-serif text-2xl font-black text-[#0f172a]">
                    Rs {finalTotal.toLocaleString()}
                  </span>
                </div>

                {step === 2 && (
                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">Delivering To</span>
                    <h4 className="font-bold text-sm text-[#0f172a]">{formData.fullName}</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {formData.street}, {formData.city}, {formData.province}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{formData.phone}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}