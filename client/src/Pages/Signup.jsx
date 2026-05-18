import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-4 flex justify-center items-start">
      <div className="bg-white w-full max-w-112.5 rounded-3xl p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">HMA-Store</span>
          <h1 className="font-serif text-4xl font-black mt-4 mb-2">Create account</h1>
          <p className="text-gray-500 text-sm">Join HMA-Store today</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Full name</label>
            <input type="text" placeholder="Haris Shahnawaz" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Email address</label>
            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-tight">Must be at least 8 characters</p>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 rounded accent-black" />
            <p className="text-[11px] text-gray-500">I agree to the <span className="text-black font-bold underline cursor-pointer">Terms</span> and <span className="text-black font-bold underline cursor-pointer">Privacy Policy</span></p>
          </div>

          <button className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity mt-4">
            Create account
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-400 bg-white px-4">or continue with</div>
        </div>

        <button className="w-full border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition-all">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
          Sign up with Google
        </button>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}