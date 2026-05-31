import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      setMessage(data.message || 'Password successfully reset.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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
          <h1 className="font-serif text-3xl font-black mt-4 mb-2">Reset Password</h1>
          <p className="text-gray-500 text-sm">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-green-50 text-green-600 text-xs font-bold rounded-xl border border-green-100">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Back to <Link to="/login" className="text-black font-bold">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
