import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, X, Sparkles, LogIn, UserPlus, ChevronRight, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useUserAuth } from "../../context/UserAuthContext";

const navigation = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Children", href: "/kids" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "Sale", href: "/sale" },
];


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { cartCount } = useCart();
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();

  const accountRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const debounceTimer = useRef(null);

  // ── Click outside closes dropdowns ──
  useEffect(() => {
    function handleClickOutside(event) {
      if (accountRef.current && !accountRef.current.contains(event.target))
        setIsAccountOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target))
        setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Auto-focus search input when opened ──
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // ── Scroll lock when mobile menu open ──
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  // ── Fetch search results from backend ──
  const fetchResults = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    setIsSearching(true);
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // ── Handle typing — debounced 300ms ──
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    clearTimeout(debounceTimer.current);
    if (val.trim()) {
      debounceTimer.current = setTimeout(() => fetchResults(val), 300);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // ── Enter key → go to /search page, Escape → close ──
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
    if (e.key === "Escape") handleSearchClose();
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
    clearTimeout(debounceTimer.current);
  };

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      handleSearchClose();
    } else {
      setIsSearchOpen(true);
      setIsAccountOpen(false);
    }
  };

  const handleAccountToggle = () => {
    setIsAccountOpen((prev) => !prev);
    if (!isAccountOpen) handleSearchClose();
  };

  // ── Click a result → go to product page ──
  const handleResultClick = (product) => {
    handleSearchClose();
    navigate(`/product/${product._id}`);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  // ── Reusable dropdown results UI ──
  const SearchDropdown = ({ isMobile = false }) => (
    <div className={`absolute top-full mt-1 bg-white border border-gray-100 shadow-xl z-50 rounded-sm overflow-hidden ${isMobile ? "left-0 w-64 sm:w-80" : "left-0 right-0"}`}>
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((product) => (
            <button
              key={product._id}
              onClick={() => handleResultClick(product)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-9 h-9 object-cover rounded-sm shrink-0 bg-gray-100"
              />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 truncate">{product.name}</p>
                <p className="text-[11px] text-gray-400 capitalize">{product.category}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[13px] font-bold text-gray-800">Rs. {product.price.toLocaleString()}</p>
                {product.originalPrice && (
                  <p className="text-[11px] text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</p>
                )}
              </div>
            </button>
          ))}
          {/* View all */}
          <button
            onClick={() => {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
              handleSearchClose();
            }}
            className="w-full px-4 py-2.5 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100 text-center"
          >
            View all results for "{searchQuery}"
          </button>
        </>
      ) : (
        <div className="px-4 py-5 text-[13px] text-gray-400 text-center">
          No products found for "{searchQuery}"
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-360 mx-auto px-4 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">

            {/* ── Hamburger ── */}
            <button
              className="lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="block h-[1.5px] w-5 bg-foreground" />
              <span className="block h-[1.5px] w-3.5 bg-foreground" />
            </button>

            {/* ── Logo ── */}
            <Link
              to="/"
              className={`absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-1 transition-opacity duration-200 ${isSearchOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"
                }`}
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

            {/* ── Right Icons ── */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* ── SEARCH ── */}
              <div ref={searchRef} className="flex items-center relative">

                {/* Desktop expanded search */}
                {isSearchOpen && (
                  <div className="hidden lg:flex flex-col mr-2 relative">
                    <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 bg-background w-56 xl:w-72">
                      <Search size={14} className="text-black/40 shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search products..."
                        className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-black/30"
                      />
                      {isSearching ? (
                        <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <Sparkles size={14} className="text-red-400 shrink-0" />
                      )}
                      <button onClick={handleSearchClose} className="text-black/40 hover:text-black shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                    {showDropdown && <SearchDropdown />}
                  </div>
                )}

                {/* Mobile expanded search */}
                {isSearchOpen && (
                  <div className="lg:hidden flex flex-col mr-1 relative">
                    <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-1.5 bg-background w-44 xs:w-52 sm:w-64">
                      <Search size={14} className="text-black/40 shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        placeholder="Search..."
                        className="flex-1 text-[13px] bg-transparent outline-none placeholder:text-black/30 min-w-0"
                      />
                      {isSearching ? (
                        <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin shrink-0" />
                      ) : (
                        <Sparkles size={14} className="text-red-400 shrink-0" />
                      )}
                      <button onClick={handleSearchClose} className="text-black/40 hover:text-black shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                    {showDropdown && <SearchDropdown isMobile />}
                  </div>
                )}

                {/* Search icon toggle button */}
                <button
                  onClick={handleSearchToggle}
                  className={`p-1.5 rounded-sm transition-colors ${isSearchOpen ? "text-black" : "text-black/60 hover:text-black"
                    }`}
                >
                  <Search size={18} />
                </button>
              </div>

              {/* ── ACCOUNT DROPDOWN ── */}
              <div ref={accountRef} className="relative">
                <button
                  onClick={handleAccountToggle}
                  className={`p-1.5 rounded-sm transition-colors ${isAccountOpen ? "bg-red-500 text-white" : "text-black/60 hover:text-black"
                    }`}
                >
                  <User size={18} />
                </button>
                {isAccountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg border border-gray-100 z-50 rounded-xl overflow-hidden">
                    {user ? (
                      <>
                        <div className="bg-[#1e293b] text-white px-5 py-4 border-b border-gray-200">
                          <p className="text-xs font-bold text-white leading-tight truncate">{user.name}</p>
                          <p className="text-[10px] text-gray-300 font-medium truncate mt-0.5">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-5 py-3 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                          >
                            <LogOut size={15} className="text-red-400" /> Logout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-[#1e293b] text-white px-5 py-3">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]">My Account</p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/login"
                            onClick={() => setIsAccountOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <User size={15} className="text-gray-400" /> Login
                          </Link>
                          <Link
                            to="/signup"
                            onClick={() => setIsAccountOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Sparkles size={15} className="text-gray-400" /> Sign Up
                          </Link>
                        </div>
                      </>
                    )}
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

      {/* ── SIDEBAR MENU ── */}
      <div className={`fixed inset-0 z-100 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
        />
        <div className={`absolute inset-y-0 left-0 w-70 bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
            <div className="border-t border-gray-100 p-6 pb-20">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Account</div>
              {user ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }} 
                    className="flex items-center gap-3 text-sm font-bold text-red-600 hover:text-red-700 mt-2 text-left w-full"
                  >
                    <LogOut size={16} className="text-red-400" /> Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black">
                    <LogIn size={16} className="text-gray-400" /> Login
                  </Link>
                  <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 text-sm font-bold text-gray-700 hover:text-black">
                    <UserPlus size={16} className="text-gray-400" /> Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}