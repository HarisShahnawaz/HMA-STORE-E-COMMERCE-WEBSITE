import { useState, useMemo } from "react";
import CollectionHeader from "../components/Collections/CollectionHeader";
import ProductCard from "../components/Products/productCard";
import { products } from "../data/products";

export default function Sale() {
  // Filters for items that fall into the "Sale" category of your 8-8-8 logic
  const saleProducts = useMemo(() => products.filter((_, index) => index % 3 === 2), []);
  const [gridCols, setGridCols] = useState(4);

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <CollectionHeader 
          title="Exclusive Sale" 
          description="Unbeatable prices on high-quality fashion. Grab your favorites before they're gone."
          count={saleProducts.length}
          gridCols={gridCols}
          onGridChange={setGridCols}
        />
        <main className="pb-24 mt-8">
          <div className={`grid ${gridCols === 4 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"} gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12`}>
            {saleProducts.map((product, index) => (
              // Note: index * 3 + 2 keeps the badge logic consistent so they all show "Sale" badges
              <ProductCard key={product.id} product={product} index={2} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}