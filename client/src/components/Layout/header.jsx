import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, X, Sparkles, LogIn, UserPlus, ChevronRight } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();

  const accountRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target))
        setIsAccountOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target))
        setIsSearchOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Scroll Lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) setSearchQuery("");
    // Close account dropdown when opening search
    setIsAccountOpen(false);
  };

  const handleAccountToggle = () => {
    setIsAccountOpen((prev) => !prev);
    // Close search when opening account
    if (!isAccountOpen) setIsSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-360 mx-auto px-4 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">

            {/* ── Hamburger (mobile) ── */}
            <button
              className="lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block h-[1.5px] w-5 bg-foreground" />
              <span className="block h-[1.5px] w-3.5 bg-foreground" />
            </button>

            {/* ── Logo — hidden on mobile when search is open ── */}
            <Link
              to="/"
              className={`absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-1 transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}
            >
              <span className="font-serif text-[1rem] md:text-[1.5rem] font-black tracking-tight text-foreground">
                HMA-Store
              </span>
              <Sparkles className="h-3 w-3 text-red-500" fill="currentColor" />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-black/60 hover:text-black"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* ── Right icons ── */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* ── SEARCH ── */}
              <div ref={searchRef} className="flex items-center">
                {/* Expanded search bar (desktop) */}
                {isSearchOpen && (
                  <div className="hidden lg:flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 bg-background mr-2 w-56 xl:w-72">
                    <Search size={14} className="text-black/40 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-black/30"
                    />
                    {/* AI sparkle icon */}
                    <Sparkles size={14} className="text-red-400 shrink-0" />
                    <button
                      onClick={handleSearchToggle}
                      className="text-black/40 hover:text-black shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Expanded search bar (mobile — overlays header) */}
                {isSearchOpen && (
                  <div className="lg:hidden flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 bg-background w-44 xs:w-52 sm:w-64 mr-1">
                    <Search size={14} className="text-black/40 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-black/30 min-w-0"
                    />
                    <Sparkles size={14} className="text-red-400 shrink-0" />
                    <button
                      onClick={handleSearchToggle}
                      className="text-black/40 hover:text-black shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Search icon button */}
                <button
                  onClick={handleSearchToggle}
                  className={`p-1.5 rounded-sm transition-colors ${isSearchOpen ? "text-black" : "text-black/60 hover:text-black"}`}
                >
                  <Search size={18} />
                </button>
              </div>

              {/* ── ACCOUNT DROPDOWN ── */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={handleAccountToggle}
                  className={`p-1.5 rounded-sm transition-colors ${
                    isAccountOpen
                      ? "bg-red-500 text-white"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  <User size={18} />
                </button>

                {/* Dropdown panel */}
                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-lg border border-gray-100 z-50">
                    {/* Header bar */}
                    <div className="bg-[#1e293b] text-white px-5 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">
                        My Account
                      </p>
                    </div>

                    {/* Links */}
                    <div className="py-2">
                      <Link
                        to="/login"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={15} className="text-gray-400" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-3 px-5 py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Sparkles size={15} className="text-gray-400" />
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* ── CART ── */}
              <Link to="/cart" className="p-1.5 relative text-black/60 hover:text-black">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 text-[8px] text-white rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── SIDEBAR MENU (unchanged) ── */}
      <div
        className={`fixed inset-0 z-100 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        <div
          className={`absolute inset-y-0 left-0 w-70 bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="bg-[#0f172a] text-white p-6 pt-10 relative">
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
              <h2 className="font-serif text-xl font-black flex items-center gap-2">
                HMA-Store{" "}
                <Sparkles size={14} className="text-yellow-400" />
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-1">
                Ai-Powered Fashion
              </p>
            </div>

            <div className="py-4">
              <div className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Browse
              </div>
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

            <div className="border-t border-gray-100 p-6 pb-20">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                Account
              </div>
              <div className="flex flex-col gap-5">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black"
                >
                  <LogIn size={16} className="text-gray-400" /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black"
                >
                  <UserPlus size={16} className="text-gray-400" /> Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}