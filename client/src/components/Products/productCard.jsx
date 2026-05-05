import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ProductCard({ product, index }) {
  const [wishlisted, setWishlisted] = useState(false);

  const getBadgeType = (p, i) => {
    if (p.aiRecommended) return "ai";
    if (p.isSale) return "sale";
    return (["new", "ai", "sale"])[i % 3];
  };

  return (
    <div className="group flex flex-col bg-white">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#f6f6f6] aspect-3/4 mb-3 rounded-2xl">
        <div className="absolute top-3 left-3 z-10">
          <Badge type={getBadgeType(product, index)} />
        </div>
        
        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm hover:scale-110"
        >
          <Heart 
            size={14} 
            fill={wishlisted ? '#000' : 'none'} 
            stroke={wishlisted ? '#000' : 'currentColor'} 
          />
        </button>

        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>

        {/* LAPTOP ONLY: Pill Button (Hidden on Mobile) */}
        <div className="hidden md:flex absolute bottom-5 left-0 right-0 justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-30">
          <Button className="h-10 px-6">
            <ShoppingBag size={15} />
            ADD TO CART
          </Button>
        </div>
      </div>

     {/* MOBILE ONLY: Single Button above text */}
<div className="md:hidden px-1 mb-3">
  <Button 
    variant="outline" 
    className="w-full h-10 rounded-xl flex items-center justify-center gap-2 px-2"
  >
    {/* Icon size matches text weight */}
    <ShoppingBag size={16} strokeWidth={2.5} className="shrink-0" />
    
    <span className="text-[13px] font-bold whitespace-nowrap">
      Add to Cart
    </span>
  </Button>
</div>

      {/* Details Section */}
      <div className="flex flex-col px-1">
        <div className="space-y-0.5">
          <h3 className="font-serif text-[15px] font-black text-black leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-[10px] uppercase text-gray-400 font-bold tracking-[0.15em]">
            {product.category}
          </p>
          <div className="font-sans text-[13px] font-black text-black mt-1">
            Rs {product.price?.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}