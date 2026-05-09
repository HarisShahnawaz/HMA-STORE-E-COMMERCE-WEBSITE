import { useState, useMemo } from "react";
import { X } from "lucide-react";
import CollectionHeader from "../components/Collections/CollectionHeader";
import FilterSidebar from "../components/Collections/FilterSidebar";
import ProductCard from "../components/Products/productCard";
import { products } from "../data/products";

// 20 products initially as requested
const INITIAL_SIZE = 20;
const LOAD_MORE_SIZE = 4;

const CATEGORY_MAP = {
  All: () => true,
  Tops: (p) => /polo|shirt|tee|hoodie|sweater|blouse|top|oxford|wool/i.test(p.name),
  Bottoms: (p) => /trouser|chino|jean|pant|bottom|skirt/i.test(p.name),
  Dresses: (p) => /dress|gown|suit|set/i.test(p.name),
  Outerwear: (p) => /jacket|coat|blazer|vest|puffer|denim jacket/i.test(p.name),
  Accessories: (p) => /belt|scarf|bag|earring|accessory/i.test(p.name),
};

const sortProducts = (list, sort) => {
  const arr = [...list];
  if (sort === "Newest") return arr.filter(p => p.isNew).concat(arr.filter(p => !p.isNew));
  if (sort === "Price: Low to High") return arr.sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") return arr.sort((a, b) => b.price - a.price);
  return arr;
};

export default function Men() {
  const menProducts = useMemo(
    () => products.filter(p => p.category.toLowerCase() === "men"),
    []
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showAiOnly, setShowAiOnly] = useState(false);
  const [sortValue, setSortValue] = useState("Featured");
  
  // Defaulting to 3 columns as requested
const [gridCols, setGridCols] = useState(4);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SIZE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = menProducts;
    const matchFn = CATEGORY_MAP[selectedCategory] ?? CATEGORY_MAP.All;
    if (selectedCategory !== "All") result = result.filter(matchFn);
    result = result.filter(p => p.price <= priceMax);
    if (showAiOnly) result = result.filter(p => p.aiRecommended);
    result = sortProducts(result, sortValue);
    return result;
  }, [menProducts, selectedCategory, priceMax, showAiOnly, sortValue]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleReset = () => {
    setSelectedCategory("All");
    setPriceMax(10000);
    setSelectedSizes([]);
    setShowAiOnly(false);
    setSortValue("Featured");
    setVisibleCount(INITIAL_SIZE);
  };

  // 3-column logic: 1 on mobile, 2 on small tablets, 3 on desktop
 const colClass = gridCols === 4
  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // Default: 2 mobile, 3 tablet, 4 desktop
  : "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"; // Toggled: 2 mobile, 2 tablet, 3 desktop

  const sidebarProps = {
    selectedCategory,
    onCategoryChange: (cat) => { setSelectedCategory(cat); setVisibleCount(INITIAL_SIZE); },
    priceMax,
    onPriceChange: (val) => { setPriceMax(val); setVisibleCount(INITIAL_SIZE); },
    selectedSizes,
    onSizeChange: (size) => setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]),
    showAiOnly,
    onAiToggle: () => { setShowAiOnly(p => !p); setVisibleCount(INITIAL_SIZE); },
    onReset: () => { handleReset(); setDrawerOpen(false); },
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-360 mx-auto px-4 md:px-8">

        <CollectionHeader
          title="Men"
          description="Sophisticated essentials crafted for the modern man. Discover tailored pieces that blend timeless style with contemporary comfort."
          count={filtered.length}
          sortValue={sortValue}
          onSortChange={(val) => { setSortValue(val); setVisibleCount(INITIAL_SIZE); }}
          gridCols={gridCols}
          onGridChange={setGridCols}
          // Now passing the function to open the drawer
          onOpenFilters={() => setDrawerOpen(true)} 
        />

        {/* Removed the old redundant mobile filter bar that caused double buttons */}

        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-sans text-[13px] font-black uppercase tracking-[0.2em]">Filters</span>
                <button onClick={() => setDrawerOpen(false)} className="p-1 hover:bg-muted rounded-full">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <FilterSidebar {...sidebarProps} />
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 pb-12">
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          <main className="flex-1 pb-24">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-serif text-2xl text-foreground mb-2">No products found</p>
                <button onClick={handleReset} className="px-8 py-3 border border-border rounded-full font-sans text-xs font-bold uppercase tracking-widest mt-4">
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid ${colClass} gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12`}>
                  {visible.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-16 mb-4">
                    <button
                      onClick={() => setVisibleCount(c => c + LOAD_MORE_SIZE)}
                      className="px-10 py-3 border border-black rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-md"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}