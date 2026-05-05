import { Sparkles } from "lucide-react";
import ProductGrid from "../Products/productGrid";
import { products } from "../../data/products";

export function Featured() {
  // 1. Strict filtering and slicing to get exactly 6, 6, and 4
  const men = products
    .filter(p => p.category.toLowerCase() === 'men')
    .slice(0, 6); 
    
  const women = products
    .filter(p => p.category.toLowerCase() === 'women')
    .slice(0, 6); 
    
  const kids = products
    .filter(p => p.category.toLowerCase() === 'kids' || p.category.toLowerCase() === 'children')
    .slice(0, 4); 

  // 2. Combine and then SHUFFLE randomly
  const mixedCollection = [...men, ...women, ...kids].sort(() => Math.random() - 0.5);

  return (
    <section className="w-full bg-white pt-12 pb-20 px-6 md:px-12">
      <div className="max-w-325 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-red-500" fill="currentColor" />
              <span className="font-sans text-[12px] font-black uppercase tracking-[0.3em] text-red-500">
                AI Curated
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-7xl font-black text-black leading-[0.85] tracking-tighter">
              Featured  Collection
            </h2>
          </div>
          <p className="text-[14px] text-gray-800 max-w-70 leading-relaxed md:text-right font-medium ">
           Handpicked by our AI stylist based on trending styles and customer favorites
          </p>
        </div>

        {/* The Grid with exactly 16 randomized products */}
        <ProductGrid products={mixedCollection} />
      </div>
    </section>
  );
}