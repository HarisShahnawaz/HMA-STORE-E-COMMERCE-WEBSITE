import { useState, useMemo } from "react";
import CollectionHeader from "../components/Collections/CollectionHeader";
import ProductCard from "../components/Products/productCard";
import { products } from "../data/products";

const INITIAL_SIZE = 20;

const sortProducts = (list, sort) => {
  const arr = [...list];
  if (sort === "Price: Low to High") return arr.sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") return arr.sort((a, b) => b.price - a.price);
  return arr; // "Featured" or "Newest" just returns the default isNew list
};

export default function NewArrivals() {
  // 1. Pull EVERY product where isNew is true
  const globalNewArrivals = useMemo(() => products.filter(p => p.isNew), []);

  // 2. States for UI and Sorting
  const [sortValue, setSortValue] = useState("Featured");
  const [gridCols, setGridCols] = useState(4);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SIZE);

  // 3. Apply Sorting logic
  const filtered = useMemo(() => {
    return sortProducts(globalNewArrivals, sortValue);
  }, [globalNewArrivals, sortValue]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* The 'Featured' button lives inside this Header */}
        <CollectionHeader 
          title="New Arrivals" 
          description="The latest drops from Men, Women, and Kids collections."
          count={filtered.length}
          sortValue={sortValue}
          onSortChange={(val) => { setSortValue(val); setVisibleCount(INITIAL_SIZE); }}
          gridCols={gridCols}
          onGridChange={setGridCols}
          // Note: Since New Arrivals is a focused page, we usually don't need the Sidebar filters here
        />

        <main className="pb-24 mt-8">
          {visible.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-xl">No new items found.</p>
            </div>
          ) : (
            <div className={`grid ${gridCols === 4 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3"} gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12`}>
              {visible.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={0} // Forces the black 'NEW' badge for every item
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}