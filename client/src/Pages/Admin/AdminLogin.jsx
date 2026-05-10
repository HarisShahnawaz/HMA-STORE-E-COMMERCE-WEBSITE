import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { ShieldCheck, Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dynamic API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      login(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center px-4 selection:bg-zinc-900 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 p-12 border border-zinc-100">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-zinc-900/20 ring-4 ring-zinc-50">
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="font-serif text-4xl font-black text-zinc-900 tracking-tighter">Secure Login</h1>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mt-3">HMA Store Management</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold px-5 py-4 rounded-2xl mb-8 flex items-center gap-3 animate-shake">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 block mb-3 ml-1">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@hmastore.com"
              className="w-full px-6 py-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 block mb-3 ml-1">
              Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 text-sm focus:outline-none focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 transition-all pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-900 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-zinc-900/20 mt-4"
          >
            {loading ? "Verifying..." : "Authorize Entry"}
          </button>
        </form>

        <div className="mt-12 text-center">
            <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest">
                Protected by HMA Security Protocol v2.6
            </p>
        </div>
      </div>
    </div>
  );
}