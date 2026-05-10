import { Sparkles } from "lucide-react";
import ProductCard from "../Products/productCard";
import { useProducts } from "../../hooks/useProducts";
import { useMemo } from "react";

export default function Featured() {
  const { products, loading } = useProducts();

  const mixedCollection = useMemo(() => {
    const men = products.filter(p => p.category === 'men').slice(0, 6);
    const women = products.filter(p => p.category === 'women').slice(0, 6);
    const kids = products.filter(p => p.category === 'kids').slice(0, 4);
    return [...men, ...women, ...kids].sort(() => Math.random() - 0.5);
  }, [products]);

  return (
    <section className="w-full bg-white pt-12 pb-20 px-4 md:px-12">
      <div className="max-w-360 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-gray-100 pb-8 px-2 md:px-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-red-500" fill="currentColor" />
              <span className="font-sans text-[12px] font-black uppercase tracking-[0.3em] text-red-500">
                AI Curated
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-7xl font-black text-black leading-[0.85] tracking-tighter">
              Featured Collection
            </h2>
          </div>
          <p className="text-[14px] text-gray-800 max-w-100 leading-relaxed md:text-right font-medium">
            Handpicked by our AI stylist based on trending styles and customer favorites
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-3/4 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
            {mixedCollection.map((product, index) => (
              <ProductCard
                key={product._id}
                product={{ ...product, id: product._id }}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}