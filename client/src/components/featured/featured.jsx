import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart, ShoppingBag } from "lucide-react";
import { products } from "../../data/products";

const menProducts = products.filter(p => p.category === "men").slice(0, 6);
const womenProducts = products.filter(p => p.category === "women").slice(0, 6);
const kidsProducts = products.filter(p => p.category === "kids").slice(0, 4);

const featuredProducts = [
  ...menProducts.slice(0, 4),
  ...womenProducts.slice(0, 4),
  ...kidsProducts.slice(0, 4),
  ...menProducts.slice(4, 6),
  ...womenProducts.slice(4, 6),
].slice(0, 16);

// Cycle badges for products that don't have one
const defaultBadges = ["New", "AI Pick", "Sale", "New", "AI Pick"];

function getBadgeType(product, index) {
  if (product.aiRecommended) return "ai";
  if (product.isSale) return "sale";
  if (product.isNew) return "new";
  // Assign rotating default badge
  const cycle = defaultBadges[index % defaultBadges.length];
  if (cycle === "AI Pick") return "ai";
  if (cycle === "Sale") return "sale";
  return "new";
}

function Badge({ type }) {
  if (type === "ai") return (
    <span className="flex items-center gap-1 bg-white text-black text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full shadow-sm">
      <Sparkles className="h-2.5 w-2.5" style={{ color: 'var(--brand-accent)' }} />
      AI Pick
    </span>
  );
  if (type === "sale") return (
    <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full">
      Sale
    </span>
  );
  return (
    <span className="bg-black text-white text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full">
      New
    </span>
  );
}

function ProductCard({ product, index }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const badgeType = getBadgeType(product, index);

  return (
    <div className="group flex flex-col">

      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-[#f0ebe3] aspect-[3/4] mb-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge type={badgeType} />
        </div>

        {/* Wishlist - shows on hover */}
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center
                      rounded-full transition-all duration-200
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                      ${wishlisted ? 'bg-red-50' : 'bg-white/80 backdrop-blur-sm hover:bg-white'}`}
        >
          <Heart
            className="h-3.5 w-3.5 transition-colors duration-200"
            fill={wishlisted ? '#ef4444' : 'none'}
            stroke={wishlisted ? '#ef4444' : 'currentColor'}
          />
        </button>

        {/* Product Image */}
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Add to Cart - DESKTOP ONLY: slides up on hover */}
        <div className="hidden md:flex absolute bottom-3 left-0 right-0 justify-center
                        translate-y-16 group-hover:translate-y-0
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300 ease-out">
          <button className="flex items-center gap-2
                             bg-black text-white
                             font-sans text-[10px] font-bold uppercase tracking-[0.15em]
                             px-6 py-2.5 rounded-full shadow-lg
                             hover:bg-foreground/80 transition-colors">
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-[14px] md:text-[15px] font-bold text-foreground mb-1
                         hover:text-black/70 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-muted-foreground mb-1.5 capitalize">
          {product.category === "kids" ? "Children" : product.category}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-sans text-[13px] md:text-[14px] font-semibold text-foreground">
            Rs {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-[11px] text-muted-foreground line-through">
              Rs {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart - MOBILE ONLY: always visible below */}
        <button
          className="md:hidden mt-auto w-full flex items-center justify-center gap-2
                     border border-border text-foreground
                     font-sans text-[10px] font-bold uppercase tracking-[0.15em]
                     py-2.5 rounded-full
                     hover:bg-foreground hover:text-background hover:border-foreground
                     transition-all duration-200"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export function Featured() {
  return (
    <section className="w-full bg-background pt-16 md:pt-20 pb-8 px-4 md:px-6">
      {/* Section Header */}
      <div className="max-w-360 mx-auto mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-3.5 w-3.5" style={{ color: 'var(--brand-accent)' }} />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: 'var(--brand-accent)' }}>
                AI Curated
              </span>
            </div>
            <h2 className="font-serif text-[2.2rem] md:text-[3rem] font-black text-foreground leading-tight">
              Featured Collection
            </h2>
          </div>
          <p className="font-sans text-sm text-muted-foreground max-w-xs md:max-w-sm md:text-right">
            Handpicked by our AI stylist based on trending styles and customer favorites
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-360 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-14">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        
      </div>

    </section>
  );
}