import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, X, Sparkles, LogIn, UserPlus, ArrowRight } from "lucide-react";
import { useCart } from "../../context/CartContext";

const navigation = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Children", href: "/kids" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
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
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-360 mx-auto px-4 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">

            {/* Mobile Menu Toggle - Hidden when search is open to save space */}
            <button
              className={`lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8 transition-opacity duration-300 ${isSearchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block h-[1.5px] w-5 bg-foreground" />
              <span className="block h-[1.5px] w-3.5 bg-foreground" />
            </button>

            {/* Logo - Pushed to the far left edge when search is active */}
            <Link
              to="/"
              className={`flex items-center gap-1 absolute transition-all duration-300 ease-in-out ${
                isSearchOpen 
                ? "left-0 translate-x-0 scale-90" 
                : "left-1/2 -translate-x-1/2"
              } lg:static lg:left-auto lg:translate-x-0`}
              onClick={closeMenu}
            >
              <span className="font-serif text-[1rem] md:text-[1.5rem] font-black tracking-tight text-foreground whitespace-nowrap">
                HMA-Store
              </span>
              <Sparkles className="h-3 w-3 text-red-500" fill="currentColor" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `font-sans text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                      isActive ? "text-black border-b-2 border-black pb-1" : "text-black/60 hover:text-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Icons Section */}
            <div className="flex items-center gap-1 md:gap-6">
              
              {/* White Search Box - Width adjusted for small mobile screens */}
              <div ref={searchRef} className="flex items-center">
                <div className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-full ${
                  isSearchOpen ? "w-26.25 xs:w-36 sm:w-64 opacity-100 px-2 shadow-sm" : "w-0 opacity-0 px-0 border-none"
                }`}>
                  <Search size={12} className="text-gray-400 shrink-0" />
                  <input 
                    type="text"
                    placeholder="Search..."
                    className="h-7 w-full bg-transparent border-none px-1.5 text-[10px] outline-none"
                    autoFocus={isSearchOpen}
                  />
                </div>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-black/70 hover:text-black transition-all duration-200 p-1.5"
                >
                  {isSearchOpen ? <X size={16} strokeWidth={2} /> : <Search size={18} strokeWidth={1.5} />}
                </button>
              </div>

              {/* Account Dropdown */}
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="text-black/70 hover:text-black transition-all duration-200 block p-1.5"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-100 animate-in fade-in zoom-in duration-200">
                    <div className="bg-[#0f172a] px-4 py-3">
                      <span className="text-white font-sans text-[10px] font-black uppercase tracking-[0.2em]">My Account</span>
                    </div>
                    <div className="py-2">
                      <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <LogIn size={15} className="text-gray-400" /> Login
                      </Link>
                      <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <UserPlus size={15} className="text-gray-400" /> Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Bag */}
              <Link to="/cart" className="text-black/70 hover:text-black transition-all duration-200 relative p-1.5">
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center bg-red-500 text-[8px] text-white rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}