import { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import AdminLayout from "../../components/Admin/AdminLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6'];

export default function AllUsers() {
  const { token } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    activeThisWeek: 0,
    newThisMonth: 0,
    growthRate: 0
  });

  useEffect(() => {
    fetch(`${API_URL}/api/admin/dashboard-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setStats({
          total: data.usersCount || 0,
          activeThisWeek: Math.floor((data.usersCount || 0) * 0.3),
          newThisMonth: Math.floor((data.usersCount || 0) * 0.15),
          growthRate: 12.5
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Users fetch error:", err);
        setLoading(false);
      });
  }, [token]);

  // Mock data for charts
  const weeklyData = [
    { name: 'Mon', users: 12 },
    { name: 'Tue', users: 19 },
    { name: 'Wed', users: 15 },
    { name: 'Thu', users: 22 },
    { name: 'Fri', users: 28 },
    { name: 'Sat', users: 35 },
    { name: 'Sun', users: 42 },
  ];

  const monthlyData = [
    { name: 'Jan', users: 65 },
    { name: 'Feb', users: 78 },
    { name: 'Mar', users: 90 },
    { name: 'Apr', users: 81 },
    { name: 'May', users: 95 },
    { name: 'Jun', users: 110 },
  ];

  const userDistribution = [
    { name: 'Active', value: 65 },
    { name: 'Inactive', value: 25 },
    { name: 'New', value: 10 },
  ];

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
        {/* Page heading */}
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-black tracking-tight">Registered Users</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Complete user management and analytics.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Users size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-black">{stats.total} Total</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><Users size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Total Users</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><UserCheck size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.activeThisWeek}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Active This Week</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><Calendar size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.newThisMonth}</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">New This Month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-violet-700 rounded-2xl p-5 shadow-sm">
            <div className="text-white/70 mb-3"><TrendingUp size={20} /></div>
            <p className="font-serif text-2xl font-bold text-white">{stats.growthRate}%</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mt-1">Growth Rate</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Signups */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-lg font-bold text-black mb-4">Weekly Signups</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
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
                <Bar dataKey="users" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* User Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-lg font-bold text-black mb-4">User Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderRadius: '8px', 
                    border: 'none',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {userDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs font-medium text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="font-serif text-lg font-bold text-black mb-4">Monthly User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-serif text-lg font-bold text-black mb-4">Recent Users</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="text-sm text-gray-400 py-12 text-center">No users registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400 uppercase font-black tracking-wider">
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold text-right">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-3 font-bold text-gray-800">
                        {user.name || 'Unknown'}
                      </td>
                      <td className="py-3 text-gray-500">
                        {user.email || 'N/A'}
                      </td>
                      <td className="py-3 text-gray-400 text-right">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
