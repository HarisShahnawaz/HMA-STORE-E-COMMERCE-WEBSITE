import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { TrendingUp, DollarSign, ShoppingCart, Calendar } from "lucide-react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SalesRevenue() {
  const { token } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    monthlyGrowth: 0
  });

  useEffect(() => {
    fetch(`${API_URL}/api/admin/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const revenue = data.totalRevenue || 0;
        const orders = data.ordersCount || 0;
        setStats({
          totalRevenue: revenue,
          totalOrders: orders,
          avgOrderValue: orders > 0 ? Math.round(revenue / orders) : 0,
          monthlyGrowth: 15.3
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sales fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  // Mock data for charts
  const dailyRevenue = [
    { name: 'Mon', revenue: 12500, orders: 45 },
    { name: 'Tue', revenue: 18200, orders: 62 },
    { name: 'Wed', revenue: 15600, orders: 51 },
    { name: 'Thu', revenue: 22100, orders: 78 },
    { name: 'Fri', revenue: 28500, orders: 95 },
    { name: 'Sat', revenue: 32400, orders: 112 },
    { name: 'Sun', revenue: 29800, orders: 103 },
  ];

  const monthlyRevenue = [
    { name: 'Jan', revenue: 85000 },
    { name: 'Feb', revenue: 92000 },
    { name: 'Mar', revenue: 105000 },
    { name: 'Apr', revenue: 98000 },
    { name: 'May', revenue: 125000 },
    { name: 'Jun', revenue: 142000 },
  ];

  const categoryRevenue = [
    { name: 'Men', revenue: 45000 },
    { name: 'Women', revenue: 62000 },
    { name: 'Kids', revenue: 35000 },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        {/* Page heading */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">Sales Revenue</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Complete sales analytics and revenue tracking.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <DollarSign size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-black">Rs {stats.totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><DollarSign size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">Rs {stats.totalRevenue.toLocaleString()}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Total Revenue</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><ShoppingCart size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.totalOrders}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Total Orders</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><TrendingUp size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">Rs {stats.avgOrderValue.toLocaleString()}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Avg Order Value</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><Calendar size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.monthlyGrowth}%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Monthly Growth</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-lg font-bold text-black mb-4">Daily Revenue & Orders</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderRadius: '8px', 
                    border: 'none',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-lg font-bold text-black mb-4">Revenue by Category</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={categoryRevenue} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#9ca3af" width={60} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderRadius: '8px', 
                    border: 'none',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-serif text-lg font-bold text-black mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  borderRadius: '8px', 
                  border: 'none',
                  color: '#fff'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#14b8a6" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Summary Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-serif text-lg font-bold text-black mb-4">Revenue Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase font-black tracking-wider">
                  <th className="pb-3 font-semibold">Period</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Orders</th>
                  <th className="pb-3 font-semibold text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {dailyRevenue.map((item) => (
                  <tr
                    key={item.name}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 font-bold text-gray-800">{item.name}</td>
                    <td className="py-3 text-gray-600 font-medium">Rs {item.revenue.toLocaleString()}</td>
                    <td className="py-3 text-gray-500">{item.orders}</td>
                    <td className="py-3 text-emerald-600 font-bold text-right">+{Math.floor(Math.random() * 20 + 5)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
