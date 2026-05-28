import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-112.5 rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">HMA-Store</span>
          <h1 className="font-serif text-4xl font-black mt-4 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your Account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Email address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">Forgot password?</Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400 bg-white px-4">or continue with</div>
        </div>

        <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
          Continue with Google
        </button>

        <p className="text-center mt-8 text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-black font-bold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}