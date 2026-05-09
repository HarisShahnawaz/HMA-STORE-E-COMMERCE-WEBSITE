import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, X, Sparkles, LogIn, UserPlus, ArrowRight } from "lucide-react";

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto px-5 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">

            {/* Mobile: Hamburger — LEFT (inline styles to guarantee rendering) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
                width: "32px",
                height: "32px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              className="lg:hidden"
            >
              <span style={{ display: "block", height: "1.5px", width: "20px", backgroundColor: "#000" }} />
              <span style={{ display: "block", height: "1.5px", width: "14px", backgroundColor: "#000" }} />
            </button>

            {/* Logo — centered on mobile, left on desktop */}
            <Link
              to="/"
              className="flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2 lg:static lg:left-auto lg:translate-x-0"
              onClick={closeMenu}
            >
              <span className="font-serif text-[1.25rem] md:text-[1.6rem] font-black tracking-tight text-foreground">
                HMA-Store
              </span>
              <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-red-500" fill="currentColor" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `font-sans text-[11.5px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                      isActive
                        ? "text-black border-b-2 border-black pb-1"
                        : "text-black/60 hover:text-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-7">
              <button className="text-black/70 hover:text-black transition-all duration-200">
                <Search className="h-[18px] w-[18px] stroke-[1.5]" />
              </button>

              {/* Account dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  onBlur={() => setTimeout(() => setIsAccountOpen(false), 200)}
                  className="text-black/70 hover:text-black transition-all duration-200 block"
                >
                  <User className="h-[18px] w-[18px] stroke-[1.5]" />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in zoom-in duration-200">
                    <div className="bg-[#0f172a] px-4 py-3">
                      <span className="text-white font-sans text-[10px] font-black uppercase tracking-[0.2em]">
                        My Account
                      </span>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <LogIn size={16} className="text-gray-400" />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <UserPlus size={16} className="text-gray-400" />
                        Sign Up
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link to="/cart" className="text-black/70 hover:text-black transition-all duration-200 relative">
                <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
                <span className="absolute -top-1.5 -right-2 h-3.5 w-3.5 flex items-center justify-center bg-black text-[8px] text-white rounded-full font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* ── Slide-in Panel ── */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-[85%] max-w-sm flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#fff" }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <Link to="/" onClick={closeMenu} className="flex items-center gap-1.5">
            <span className="font-serif font-black tracking-tight text-black" style={{ fontSize: "1.15rem" }}>
              HMA-Store
            </span>
            <Sparkles className="h-3 w-3 text-red-500" fill="currentColor" />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            style={{
              padding: "6px",
              borderRadius: "50%",
              border: "none",
              background: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* Browse label */}
          <div className="px-6 pt-7 pb-3">
            <span
              className="font-sans font-black uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9ca3af" }}
            >
              Browse
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMenu}
                className="group"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 24px",
                  borderBottom: "1px solid #f3f4f6",
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <span
                  className="font-sans font-bold uppercase"
                  style={{ fontSize: "13px", letterSpacing: "0.15em", color: "#000" }}
                >
                  {item.name}
                </span>
                <ArrowRight size={15} style={{ color: "#9ca3af" }} />
              </Link>
            ))}
          </nav>

          {/* Account label */}
          <div className="px-6 pt-8 pb-3">
            <span
              className="font-sans font-black uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9ca3af" }}
            >
              Account
            </span>
          </div>

          <div className="flex flex-col">
            <Link
              to="/login"
              onClick={closeMenu}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #f3f4f6",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <LogIn size={16} style={{ color: "#9ca3af" }} />
                <span
                  className="font-sans font-bold uppercase"
                  style={{ fontSize: "13px", letterSpacing: "0.15em", color: "#000" }}
                >
                  Login
                </span>
              </div>
              <ArrowRight size={15} style={{ color: "#9ca3af" }} />
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                borderBottom: "1px solid #f3f4f6",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <UserPlus size={16} style={{ color: "#9ca3af" }} />
                <span
                  className="font-sans font-bold uppercase"
                  style={{ fontSize: "13px", letterSpacing: "0.15em", color: "#000" }}
                >
                  Sign Up
                </span>
              </div>
              <ArrowRight size={15} style={{ color: "#9ca3af" }} />
            </Link>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="px-6 py-5" style={{ borderTop: "1px solid #f3f4f6" }}>
          <p
            className="font-sans font-black uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#9ca3af", margin: 0 }}
          >
            HMA-Store · AI-Powered Fashion
          </p>
        </div>
      </div>
    </>
  );
}