import CollectionHeader from "../components/Collections/CollectionHeader";
import FilterSidebar from "../components/Collections/FilterSidebar";
import ProductCard from "../components/Products/ProductCard";
import { products } from "../data/products";

export default function Men() {
  const menProducts = products?.filter(p => p.category.toLowerCase() === "men") || [];

  return (
    <div className="bg-background min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        <CollectionHeader 
          title="Men"
          description="Sophisticated essentials crafted for the modern man. Discover tailored pieces that blend timeless style with contemporary comfort."
          count={menProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          {/* Sidebar Architecture */}
          <aside className="w-full lg:w-64 shrink-0">
            {/* On mobile, this can be a toggleable 'Filters' button as seen in image_ddb81b */}
            <div className="lg:sticky lg:top-32">
              <FilterSidebar />
            </div>
          </aside>

          {/* 4-Column Product Grid */}
          <main className="flex-1 pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
              {menProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index} 
                />
              ))}
            </div>

            {/* Load More Button - matches image_ddb50c */}
            {menProducts.length > 0 && (
              <div className="flex justify-center mt-20">
                <button className="px-10 py-3 border border-border rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors">
                  Load More
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}