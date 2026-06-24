import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ShoppingBag } from "lucide-react";
import AdminLayout from "../../components/Admin/AdminLayout";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Mobile-friendly order card (replaces table row on small screens)
function OrderCard({ order }) {
  return (
    <div className="flex flex-col gap-1.5 p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">{order.userName}</p>
          <p className="text-[11px] text-gray-400 truncate">{order.userEmail}</p>
        </div>
        <p className="text-sm font-bold text-black whitespace-nowrap shrink-0">
          Rs {order.total.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-500 bg-white border border-gray-100 px-2 py-0.5 rounded-md font-medium">
          {order.items.length} {order.items.length === 1 ? "item" : "items"}
        </span>
        <span className="text-[11px] text-gray-400 font-medium">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default function AllOrders() {
  const { token } = useAdminAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8">
        {/* Page heading */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">All Orders</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Complete order history and details.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <ShoppingBag size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-black">{orders.length} Total</span>
          </div>
        </div>

        {/* Orders container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <p className="text-sm text-gray-400 py-12 text-center">No orders placed yet.</p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 uppercase font-black tracking-wider">
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 font-semibold text-right">Total</th>
                      <th className="pb-3 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-3 font-bold text-gray-800">
                          <div className="max-w-35 truncate">{order.userName}</div>
                          <div className="text-[10px] text-gray-400 font-medium max-w-35 truncate">
                            {order.userEmail}
                          </div>
                        </td>
                        <td className="py-3 text-gray-500 whitespace-nowrap">
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </td>
                        <td className="py-3 font-bold text-black text-right whitespace-nowrap">
                          Rs {order.total.toLocaleString()}
                        </td>
                        <td className="py-3 text-gray-400 text-right whitespace-nowrap">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-2.5">
                {orders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
