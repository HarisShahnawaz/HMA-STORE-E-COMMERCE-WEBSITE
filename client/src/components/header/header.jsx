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
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex h-14 items-center justify-between">
          
          {/* Logo - Elegant Serif style */}
          <Link to="/" className="flex items-center gap-1.5">
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              HMA-Store
            </span>
            <Sparkles className="h-3.5 w-3.5 text-primary opacity-80" />
          </Link>

          {/* Navigation - Ultra-fine text with wide tracking */}
          <nav className="hidden lg:flex items-center gap-10">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `font-sans text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive 
                      ? 'text-foreground border-b border-foreground pb-1' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Icons - Thin stroke and scaled down */}
          <div className="flex items-center gap-5 md:gap-7">
            <button className="text-foreground hover:opacity-60 transition-opacity">
              <Search className="h-4.5 w-4.5 stroke-[1.5]" />
            </button>
            
            <button className="hidden md:block text-foreground hover:opacity-60 transition-opacity">
              <User className="h-4.5 w-4.5 stroke-[1.5]" />
            </button>

            <Link to="/cart" className="text-foreground hover:opacity-60 transition-opacity relative">
              <ShoppingBag className="h-4.5 w-4.5 stroke-[1.5]" />
              <span className="absolute -top-1.5 -right-2 h-3.5 w-3.5 flex items-center justify-center bg-foreground text-[8px] text-background rounded-full font-bold">
                0
              </span>
            </Link>
            
            <button 
              className="lg:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-sm animate-in fade-in slide-in-from-top-1">
          <nav className="flex flex-col p-6 space-y-5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-foreground"
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