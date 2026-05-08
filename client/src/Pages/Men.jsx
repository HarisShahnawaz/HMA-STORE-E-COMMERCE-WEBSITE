import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import CollectionHeader from "../components/Collections/CollectionHeader";
import FilterSidebar from "../components/Collections/FilterSidebar";
import ProductCard from "../components/Products/productCard";
import { products } from "../data/products";

const PAGE_SIZE = 8;

// Maps sidebar category labels → product subcategory logic
// Since your products don't have subcategories, we map by name keywords
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
  return arr; // Featured — original order
};

export default function Men() {
  const menProducts = useMemo(
    () => products.filter(p => p.category.toLowerCase() === "men"),
    []
  );

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceMax, setPriceMax] = useState(10000);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showAiOnly, setShowAiOnly] = useState(false);

  // Sort & layout state
  const [sortValue, setSortValue] = useState("Featured");
  const [gridCols, setGridCols] = useState(4);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Mobile filter drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Derived: filtered + sorted products
  const filtered = useMemo(() => {
    let result = menProducts;

    // Category filter
    const matchFn = CATEGORY_MAP[selectedCategory] ?? CATEGORY_MAP.All;
    if (selectedCategory !== "All") result = result.filter(matchFn);

    // Price filter
    result = result.filter(p => p.price <= priceMax);

    // AI picks filter
    if (showAiOnly) result = result.filter(p => p.aiRecommended);

    // Sort
    result = sortProducts(result, sortValue);

    return result;
  }, [menProducts, selectedCategory, priceMax, showAiOnly, sortValue]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setPriceMax(10000);
    setSelectedSizes([]);
    setShowAiOnly(false);
    setSortValue("Featured");
    setVisibleCount(PAGE_SIZE);
  };

  const colClass = gridCols === 4
    ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
    : "grid-cols-1 md:grid-cols-2";

  const sidebarProps = {
    selectedCategory,
    onCategoryChange: handleCategoryChange,
    priceMax,
    onPriceChange: (val) => { setPriceMax(val); setVisibleCount(PAGE_SIZE); },
    selectedSizes,
    onSizeChange: handleSizeToggle,
    showAiOnly,
    onAiToggle: () => { setShowAiOnly(p => !p); setVisibleCount(PAGE_SIZE); },
    onReset: () => { handleReset(); setDrawerOpen(false); },
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">

        {/* ── Header: reduced pb so heading sits higher ── */}
        <CollectionHeader
          title="Men"
          description="Sophisticated essentials crafted for the modern man. Discover tailored pieces that blend timeless style with contemporary comfort."
          count={filtered.length}
          sortValue={sortValue}
          onSortChange={(val) => { setSortValue(val); setVisibleCount(PAGE_SIZE); }}
          gridCols={gridCols}
          onGridChange={setGridCols}
        />

        {/* ── Mobile filter bar ── */}
        <div className="flex lg:hidden items-center justify-between mb-4 gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-full font-sans text-[11px] font-black uppercase tracking-widest hover:bg-muted transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>
          {/* Sort inline on mobile */}
          <select
            value={sortValue}
            onChange={e => { setSortValue(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className="flex-1 px-4 py-2.5 border border-border rounded-full font-sans text-[11px] font-black uppercase tracking-widest bg-background appearance-none cursor-pointer"
          >
            {["Featured","Newest","Price: Low to High","Price: High to Low"].map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* ── Mobile Filter Drawer ── */}
        {drawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <span className="font-sans text-[13px] font-black uppercase tracking-[0.2em]">Filters</span>
                <button onClick={() => setDrawerOpen(false)} className="p-1 hover:bg-muted rounded-full transition-colors">
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

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 pb-12">
              <FilterSidebar {...sidebarProps} />
            </div>
          </aside>

          {/* ── Product Grid ── */}
          <main className="flex-1 pb-24">
            {visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <p className="font-serif text-2xl text-foreground mb-2">No products found</p>
                <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters.</p>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 border border-border rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid ${colClass} gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12`}>
                  {visible.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {hasMore && (
                  <div className="flex justify-center mt-16 mb-4">
                    <button
                      onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                      className="px-10 py-3 border border-border rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors"
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