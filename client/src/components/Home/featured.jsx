import { Sparkles } from "lucide-react";
import ProductGrid from "../Products/productGrid";
import { products } from "../../data/products";

export function Featured() {
  // Exact 16 product mix: 6 Men, 6 Women, 4 Kids
  const men = products.filter(p => p.category.toLowerCase() === 'men').slice(0, 6);
  const women = products.filter(p => p.category.toLowerCase() === 'women').slice(0, 6);
  const kids = products.filter(p => p.category.toLowerCase() === 'kids' || p.category.toLowerCase() === 'children').slice(0, 4);
  const mixedCollection = [...men, ...women, ...kids].sort(() => Math.random() - 0.5);

  return (
    <section className="w-full bg-white pt-10 md:pt-16 pb-12 px-4 md:px-8">
      {/* Refined Upper Part */}
      <div className="max-w-[1400px] mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-red-500" fill="currentColor" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">
                AI Curated
              </span>
            </div>
            <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-black text-black leading-none tracking-tight">
              Featured Collection
            </h2>
          </div>
          <p className="font-sans text-[13px] md:text-sm text-gray-500 max-w-[300px] leading-relaxed md:text-right italic">
            Handpicked by our AI stylist based on trending styles and customer favorites.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        <ProductGrid products={mixedCollection} />
      </div>
    </section>
  );
}