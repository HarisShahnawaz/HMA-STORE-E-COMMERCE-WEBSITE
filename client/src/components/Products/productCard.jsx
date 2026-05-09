import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductCard({ product, index }) {
  const [wishlisted, setWishlisted] = useState(false);

  // Balanced logic with fixed-width badges for "New" and "Sale"
  const renderBadge = () => {
    const badgeType = index % 3;

    if (badgeType === 0) {
      return (
        <div className="bg-black w-11 h-6 flex items-center justify-center rounded-md shadow-sm">
          <span className="text-[9px] font-bold uppercase tracking-wider text-white">New</span>
        </div>
      );
    }
    if (badgeType === 1) {
      // AI Pick needs to be slightly wider to fit the icon + text
      return (
        <div className="bg-white border border-black/5 px-2 h-6 flex items-center gap-1 rounded-md shadow-sm">
          <Sparkles size={10} className="text-black" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-black whitespace-nowrap">AI Pick</span>
        </div>
      );
    }
    return (
      <div className="bg-[#ef4444] w-11 h-6 flex items-center justify-center rounded-md shadow-sm">
        <span className="text-[9px] font-bold uppercase tracking-wider text-white">Sale</span>
      </div>
    );
  };

  return (
    <div className="group flex flex-col bg-white">
      <div className="relative overflow-hidden bg-[#f6f6f6] aspect-3/4 mb-3 rounded-2xl">
        
        {/* Clean, consistent badge placement */}
        <div className="absolute top-3 left-3 z-10">
          {renderBadge()}
        </div>

        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm hover:scale-110"
        >
          <Heart
            size={14}
            fill={wishlisted ? "#000" : "none"}
            stroke={wishlisted ? "#000" : "currentColor"}
          />
        </button>

        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {/* Smaller button with normal letters */}
        <div className="hidden md:flex absolute bottom-5 left-0 right-0 justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-30 px-6">
          <Button className="w-full h-8 bg-black text-white hover:bg-black/90 rounded-lg flex items-center justify-center gap-2">
            <ShoppingBag size={12} />
            <span className="text-[12px] font-medium">Add to Cart</span>
          </Button>
        </div>
      </div>

      {/* Mobile view matching desktop style */}
      <div className="md:hidden px-1 mb-3">
        <Button
          variant="outline"
          className="w-full h-8 rounded-lg flex items-center justify-center gap-2 border-black/10 text-[12px] font-medium"
        >
          <ShoppingBag size={12} />
          Add to Cart
        </Button>
      </div>

      <div className="flex flex-col px-1">
        <div className="space-y-0.5">
          <h3 className="font-serif text-[14px] font-bold text-black leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
            {product.category}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-sans text-[13px] font-black text-black">
              Rs {product.price?.toLocaleString()}
            </span>
            {(index % 3 === 2) && (
              <span className="font-sans text-[11px] text-gray-400 line-through">
                Rs {(product.price * 1.2).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}