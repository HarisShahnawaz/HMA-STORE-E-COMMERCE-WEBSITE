import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-112.5 rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">HMA-Store</span>
          <h1 className="font-serif text-4xl font-black mt-4 mb-2">Welcome back</h1>
          <p className="text-gray-500 text-sm">Sign in to your Account</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Email address</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Password</label>
              <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-black uppercase">Forgot password?</a>
            </div>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
          </div>

          <button className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
            Sign in
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