import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "../components/ui/button";
import { Sparkles, Trash2, Download, ShoppingBag } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Profile() {
  const { user, token, logout } = useUserAuth();
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [tryOns, setTryOns]         = useState([]);
  const [tryOnsLoading, setTryOnsLoading] = useState(false);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);

        // Dynamically handles your live Vercel backend deployment URL vs local development env
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        
        const response = await fetch(`${baseUrl}/api/orders/my-history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not load your shopping history.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserOrders();
    }
  }, [token]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-600 text-lg mb-4">Please log in to view your profile dashboard.</p>
        <a href="/login">
          <Button>Go to Login</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Account Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Info Details */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xl uppercase">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name || "Customer"}</h2>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Registered Member</p>
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
              <p className="text-gray-700 font-medium">{user.name}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
              <p className="text-gray-700 font-medium">{user.email}</p>
            </div>
          </div>

          <hr className="border-gray-100 my-4" />

          <Button 
            variant="destructive" 
            className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>

        {/* Previous Shopping Purchases History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-10 text-center">
              <p className="text-gray-500 mb-4">You haven't placed any shopping orders yet.</p>
              <a href="/">
                <Button variant="outline">Browse Store Products</Button>
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  
                  {/* Order Meta Data Header */}
                  <div className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center border-b border-gray-100 gap-4 text-sm">
                    <div className="flex space-x-6">
                      <div>
                        <span className="text-gray-400 block text-xs uppercase font-semibold tracking-wider">Date Placed</span>
                        <span className="font-medium text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-xs uppercase font-semibold tracking-wider">Total Charge</span>
                        <span className="font-bold text-gray-900">Rs. {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Method: {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Products Map Loop */}
                  <div className="p-6 divide-y divide-gray-100">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center space-x-4">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-14 h-14 object-cover rounded-lg border border-gray-200" 
                              onError={(e) => { e.target.style.display = 'none'; }} 
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Financial Breakdown & Shipping Details Footer */}
                  <div className="bg-gray-50/40 px-6 py-3 border-t border-gray-100 flex flex-wrap justify-between items-center text-xs text-gray-500 gap-2">
                    <div>
                      <span className="font-medium text-gray-600">Shipping Destination:</span> {order.street}, {order.city}, {order.province}
                    </div>
                    <div className="flex space-x-4 text-right">
                      <span>Subtotal: Rs. {order.subtotal.toLocaleString()}</span>
                      {order.discount > 0 && <span className="text-red-500">Discount: -Rs. {order.discount.toLocaleString()}</span>}
                      <span>Shipping: Rs. {order.shippingFee.toLocaleString()}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

//commit test