import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, Sparkles } from "lucide-react";

const navigation = [
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "Children", href: "/kids" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-360 mx-auto px-5 md:px-12">
        <div className="flex h-14 md:h-16 items-center justify-between relative">

          {/* Mobile: hamburger LEFT */}
          <button
            className="lg:hidden text-black/70 hover:text-black transition-all duration-200 w-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <Link
            to="/"
            className="flex items-center gap-1.5 
                       absolute left-1/2 -translate-x-1/2 
                       lg:static lg:left-auto lg:translate-x-0"
          >
            <span className="font-serif text-[1.25rem] md:text-[1.6rem] font-black tracking-tight text-foreground">
              HMA-Store
            </span>
            <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5" style={{ color: 'var(--brand-accent)' }} />
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
                      ? 'text-black border-b-2 border-black pb-1'
                      : 'text-black/60 hover:text-black'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-7">
            <button className="text-black/70 hover:text-black hover:scale-110 transition-all duration-200">
              <Search className="h-[17px] w-[17px] md:h-[18px] md:w-[18px] stroke-[1.5]" />
            </button>

            <button className="text-black/70 hover:text-black hover:scale-110 transition-all duration-200">
              <User className="h-[17px] w-[17px] md:h-[18px] md:w-[18px] stroke-[1.5]" />
            </button>

            <Link to="/cart" className="text-black/70 hover:text-black hover:scale-110 transition-all duration-200 relative">
              <ShoppingBag className="h-[17px] w-[17px] md:h-[18px] md:w-[18px] stroke-[1.5]" />
              <span className="absolute -top-1.5 -right-2 h-3.5 w-3.5 flex items-center justify-center bg-black text-[8px] text-white rounded-full font-bold">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-sm">
          <nav className="flex flex-col p-6 space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-black/60 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}