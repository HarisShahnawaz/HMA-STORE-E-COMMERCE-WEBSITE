import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Sparkles, Check } from "lucide-react"; // Added Check
import { Button } from "../ui/button";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product, index }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // New state for button feedback
  const { addToCart } = useCart();

  // Function to handle the temporary "Added" state
  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset back to "Add to Cart" after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const renderBadge = () => {
    const badgeType = index % 3;
    if (badgeType === 0) return (
      <div className="bg-black w-11 h-6 flex items-center justify-center rounded-md shadow-sm">
        <span className="text-[9px] font-bold uppercase tracking-wider text-white">New</span>
      </div>
    );
    if (badgeType === 1) return (
      <div className="bg-white border border-black/5 px-2 h-6 flex items-center gap-1 rounded-md shadow-sm">
        <span className="text-[9px] font-bold uppercase tracking-wider text-black whitespace-nowrap">AI Pick</span>
      </div>
    );
    return (
      <div className="bg-[#ef4444] w-11 h-6 flex items-center justify-center rounded-md shadow-sm">
        <span className="text-[9px] font-bold uppercase tracking-wider text-white">Sale</span>
      </div>
    );
  };

  return (
    <div className="group flex flex-col bg-white">
      <div className="relative overflow-hidden bg-[#f6f6f6] aspect-3/4 mb-3 rounded-2xl">
        <div className="absolute top-3 left-3 z-10">{renderBadge()}</div>

        <button
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 z-20 h-8 w-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
        >
          <Heart size={14} fill={wishlisted ? "#000" : "none"} stroke={wishlisted ? "#000" : "currentColor"} />
        </button>

        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>

        {/* Desktop Button with dynamic text/icon */}
        <div className="hidden md:flex absolute bottom-5 left-0 right-0 justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-30 px-6">
          <Button 
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full h-8 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 ${
              isAdded ? "bg-black text-white" : "bg-black text-white hover:bg-black/90"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={12} />
                <span className="text-[12px] font-medium">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={12} />
                <span className="text-[12px] font-medium">Add to Cart</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Button with dynamic text/icon */}
      <div className="md:hidden px-1 mb-3">
        <Button
          variant="outline"
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`w-full h-8 rounded-lg flex items-center justify-center gap-2 border-black/10 text-[12px] font-medium ${
            isAdded ? "bg-black text-white border-black" : ""
          }`}
        >
          {isAdded ? <Check size={12} /> : <ShoppingBag size={12} />}
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col px-1">
        <h3 className="font-serif text-[14px] font-bold text-black truncate">{product.name}</h3>
        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">{product.category}</p>
        <p className="font-sans text-[13px] font-black text-black mt-1">Rs {product.price?.toLocaleString()}</p>
      </div>
    </div>
  );
}