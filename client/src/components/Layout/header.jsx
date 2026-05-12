import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, X, Sparkles, LogIn, UserPlus, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

const navigation = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Children", href: "/kids" },
  { name: "New Arrivals", href: "/new-arrivals" }, // Added
  { name: "Sale", href: "/sale" },                 // Added
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  
  const accountRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) setIsAccountOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll Lock with internal sidebar scroll fix
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-360 mx-auto px-4 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">
            
            <button
              className="lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block h-[1.5px] w-5 bg-foreground" />
              <span className="block h-[1.5px] w-3.5 bg-foreground" />
            </button>

            <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-1">
              <span className="font-serif text-[1rem] md:text-[1.5rem] font-black tracking-tight text-foreground">HMA-Store</span>
              <Sparkles className="h-3 w-3 text-red-500" fill="currentColor" />
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <NavLink key={item.name} to={item.href} className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/60 hover:text-black">
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-6">
               <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1.5"><Search size={18}/></button>
               <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="p-1.5"><User size={18}/></button>
               <Link to="/cart" className="p-1.5 relative"><ShoppingBag size={18}/>{cartCount > 0 && <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 text-[8px] text-white rounded-full flex items-center justify-center">{cartCount}</span>}</Link>
            </div>
          </div>
        </div>
      </header>

      {/* --- SIDEBAR MENU --- */}
      <div className={`fixed inset-0 z-100 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={closeMenu} />
        
        <div className={`absolute inset-y-0 left-0 w-70 bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Header section from image_9f37a1.jpg */}
            <div className="bg-[#0f172a] text-white p-6 pt-10 relative">
              <button onClick={closeMenu} className="absolute top-4 right-4 text-white/70 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="font-serif text-xl font-black flex items-center gap-2">
                HMA-Store <Sparkles size={14} className="text-yellow-400" />
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-1">Ai-Powered Fashion</p>
            </div>

            <div className="py-4">
              <div className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Browse</div>
              <nav>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between px-6 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    {item.name}
                    <ChevronRight size={14} className="text-gray-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Account Section Update */}
            <div className="border-t border-gray-100 p-6 pb-20">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Account</div>
              <div className="flex flex-col gap-5">
                <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black">
                  <LogIn size={16} className="text-gray-400"/> Login
                </Link>
                <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black">
                  <UserPlus size={16} className="text-gray-400"/> Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}