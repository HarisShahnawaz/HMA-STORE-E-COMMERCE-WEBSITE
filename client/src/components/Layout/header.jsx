import { useState, useEffect } from "react";
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
  const { cartCount } = useCart(); // Access the live count

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
        <div className="max-w-360 mx-auto px-5 md:px-12">
          <div className="flex h-14 md:h-16 items-center justify-between relative">

            <button
              className="lg:hidden flex flex-col justify-center gap-1.25 w-8 h-8 group"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-[1.5px] w-5 bg-foreground transition-all duration-300" />
              <span className="block h-[1.5px] w-3.5 bg-foreground transition-all duration-300" />
            </button>

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

            <div className="flex items-center gap-4 md:gap-7">
              <button className="text-black/70 hover:text-black transition-all duration-200">
                <Search className="h-4.5 w-4.5 stroke-[1.5]" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  onBlur={() => setTimeout(() => setIsAccountOpen(false), 200)}
                  className="text-black/70 hover:text-black transition-all duration-200 block"
                >
                  <User className="h-4.5 w-4.5 stroke-[1.5]" />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-100 animate-in fade-in zoom-in duration-200">
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

              {/* Shopping Bag with Dynamic Count */}
              <Link to="/cart" className="text-black/70 hover:text-black transition-all duration-200 relative">
                <ShoppingBag className="h-4.5 w-4.5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 w-4 flex items-center justify-center bg-red-500 text-[9px] text-white rounded-full font-bold shadow-sm animate-in zoom-in duration-200">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 left-0 z-70 h-full w-[85%] max-w-sm bg-background flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-1.5">
            <span className="font-serif text-[1.15rem] font-black tracking-tight text-foreground">
              HMA-Store
            </span>
            <Sparkles className="h-3 w-3 text-red-500" fill="currentColor" />
          </Link>
          <button
            onClick={closeMenu}
            className="p-1.5 hover:bg-muted rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-6 pb-2">
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Browse
            </span>
          </div>

          <nav className="flex flex-col">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between px-6 py-4 border-b border-border/50 hover:bg-muted/50 transition-colors group"
              >
                <span className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-foreground">
                  {item.name}
                </span>
                <ArrowRight size={15} className="text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          <div className="px-6 pt-8 pb-2">
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Account
            </span>
          </div>

          <div className="flex flex-col">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-between px-6 py-4 border-b border-border/50 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <LogIn size={16} className="text-muted-foreground" />
                <span className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-foreground">
                  Login
                </span>
              </div>
              <ArrowRight size={15} className="text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="flex items-center justify-between px-6 py-4 border-b border-border/50 hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <UserPlus size={16} className="text-muted-foreground" />
                <span className="font-sans text-[13px] font-bold uppercase tracking-[0.15em] text-foreground">
                  Sign Up
                </span>
              </div>
              <ArrowRight size={15} className="text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-border">
          <p className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            HMA-Store · AI-Powered Fashion
          </p>
        </div>
      </div>
    </>
  );
}