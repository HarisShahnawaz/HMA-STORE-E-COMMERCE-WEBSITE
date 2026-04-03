import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { label: "MEN", page: "men" },
  { label: "WOMEN", page: "women" },
  { label: "CHILDREN", page: "children" },
  { label: "NEW ARRIVALS", page: "new-arrivals" },
  { label: "SALE", page: "sale" },
];

export default function Navbar({ activePage, onNavigate, onLoginOpen }) {
  const { cartCount, setCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNav = (page) => {
    onNavigate && onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
      style={{
        backgroundColor: "rgba(245, 242, 237, 0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-350 mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── LOGO ── */}
          <button
            onClick={() => handleNav("home")}
            className="group flex items-center gap-2 bg-transparent border-none cursor-pointer"
          >
            <Sparkles
              size={15}
              className="transition-transform duration-300 group-hover:rotate-12"
              style={{ color: "#c9a96e" }}
            />
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                fontWeight: "700",
                letterSpacing: "0.12em",
                color: "#1a1a1a",
                transition: "letter-spacing 0.3s ease",
              }}
              onMouseEnter={(e) => e.target.style.letterSpacing = "0.2em"}
              onMouseLeave={(e) => e.target.style.letterSpacing = "0.12em"}
            >
              HMA STORE
            </span>
            <Sparkles
              size={15}
              className="transition-transform duration-300 group-hover:-rotate-12"
              style={{ color: "#c9a96e" }}
            />
          </button>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className="relative bg-transparent border-none cursor-pointer pb-1 group"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: activePage === link.page ? "600" : "500",
                  letterSpacing: "0.12em",
                  color: activePage === link.page ? "#1a1a1a" : "#6b6b6b",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#1a1a1a"}
                onMouseLeave={(e) => {
                  if (activePage !== link.page) {
                    e.currentTarget.style.color = "#6b6b6b";
                  }
                }}
              >
                {link.label}
                {/* Underline */}
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300"
                  style={{
                    width: activePage === link.page ? "100%" : "0%",
                  }}
                  ref={(el) => {
                    if (el) {
                      el.closest("button").addEventListener("mouseenter", () => {
                        el.style.width = "100%";
                      });
                      el.closest("button").addEventListener("mouseleave", () => {
                        if (activePage !== link.page) el.style.width = "0%";
                      });
                    }
                  }}
                />
              </button>
            ))}
          </nav>

          {/* ── RIGHT ICONS ── */}
          <div className="flex items-center gap-1 md:gap-3">

            {/* Search */}
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search styles..."
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  className="text-sm bg-transparent outline-none pb-1 w-32 md:w-44"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    borderBottom: "1.5px solid #1a1a1a",
                    color: "#1a1a1a",
                  }}
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="p-2 rounded-full transition-all duration-200 hover:scale-110 border-none bg-transparent cursor-pointer"
                  style={{ color: "#1a1a1a" }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full border-none bg-transparent cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ color: "#1a1a1a" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ede9e2"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <Search size={20} />
              </button>
            )}

            {/* Login — desktop only */}
            <button
              onClick={() => onLoginOpen && onLoginOpen()}
              className="hidden md:flex p-2 rounded-full border-none bg-transparent cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ color: "#1a1a1a" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ede9e2"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <User size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full border-none bg-transparent cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ color: "#1a1a1a" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ede9e2"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "#e05a5a",
                    fontFamily: "'Jost', sans-serif",
                  }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full border-none bg-transparent cursor-pointer transition-all duration-200"
              style={{ color: "#1a1a1a" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#ede9e2"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>


      {/* ── MOBILE MENU ── */}~
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "#f5f2ed",
            borderColor: "#d8d3cb",
          }}
        >
          <div className="max-w-350 mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className="text-left px-4 py-3 rounded-lg border-none cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  fontWeight: activePage === link.page ? "600" : "500",
                  color: activePage === link.page ? "#1a1a1a" : "#6b6b6b",
                  backgroundColor: activePage === link.page ? "#ede9e2" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ede9e2";
                  e.currentTarget.style.color = "#1a1a1a";
                }}
                onMouseLeave={(e) => {
                  if (activePage !== link.page) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6b6b6b";
                  }
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Login */}
            <button
              onClick={() => { onLoginOpen && onLoginOpen(); setMobileOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border-none bg-transparent cursor-pointer transition-all duration-200 mt-1"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.8rem",
                color: "#6b6b6b",
                borderTop: "1px solid #d8d3cb",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ede9e2";
                e.currentTarget.style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#6b6b6b";
              }}
            >
              <User size={16} />
              Login / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}