import { useState, useMemo } from "react";
import { Grid2X2, Grid3X3, SlidersHorizontal, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductGrid({ title, subtitle, products }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceMax, setPriceMax] = useState(500);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [aiPicksOnly, setAiPicksOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [gridCols, setGridCols] = useState(4);

  // Derive unique categories from products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  // Toggle category filter
  const toggleCategory = (cat) => {
    if (cat === "All") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle size
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    result = result.filter((p) => p.price <= priceMax);
    if (aiPicksOnly) {
      result = result.filter((p) => p.badge === "AI Pick");
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "new") result.sort((a, b) => (b.badge === "New" ? 1 : -1));

    return result;
  }, [products, selectedCategories, priceMax, aiPicksOnly, sortBy]);

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem 5rem" }}>
      {/* Page Header */}
      <div style={{ textAlign: "center", padding: "3.5rem 0 2.5rem" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 700,
            color: "var(--black)",
            marginBottom: "1rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            color: "var(--gray)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Body: Sidebar + Grid */}
      <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>
        {/* ── Sidebar Filters ── */}
        <aside
          style={{
            width: "240px",
            flexShrink: 0,
            position: "sticky",
            top: "88px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--black)",
              marginBottom: "2rem",
            }}
          >
            Filters
          </h3>

          {/* Category */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "var(--black)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Category
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {categories.map((cat) => {
                const isActive =
                  cat === "All"
                    ? selectedCategories.length === 0
                    : selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="filter-checkbox"
                      checked={isActive}
                      onChange={() => toggleCategory(cat)}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: isActive ? "var(--black)" : "var(--gray)",
                        fontWeight: isActive ? 500 : 400,
                      }}
                    >
                      {cat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "var(--black)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Price Range
            </h4>
            <input
              type="range"
              min={0}
              max={500}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
                fontFamily: "var(--font-body)",
                fontSize: "0.8rem",
                color: "var(--gray)",
              }}
            >
              <span>$0</span>
              <span>${priceMax}</span>
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                color: "var(--black)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Size
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`size-btn ${selectedSizes.includes(size) ? "active" : ""}`}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "4px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    backgroundColor: selectedSizes.includes(size) ? "var(--black)" : "transparent",
                    color: selectedSizes.includes(size) ? "#fff" : "var(--black)",
                    border: `1.5px solid ${selectedSizes.includes(size) ? "var(--black)" : "var(--border)"}`,
                    transition: "all 0.2s ease",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* AI Picks Toggle */}
          <div
            style={{
              border: "1.5px solid var(--border)",
              borderRadius: "10px",
              padding: "1.25rem",
              backgroundColor: aiPicksOnly ? "var(--black)" : "transparent",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onClick={() => setAiPicksOnly(!aiPicksOnly)}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} color={aiPicksOnly ? "#fff" : "var(--black)"} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: aiPicksOnly ? "#fff" : "var(--black)",
                }}
              >
                AI Picks
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: aiPicksOnly ? "rgba(255,255,255,0.75)" : "var(--gray)",
                lineHeight: 1.5,
              }}
            >
              Show only items recommended for your style
            </p>
          </div>
        </aside>

        {/* ── Products Area ── */}
        <div style={{ flex: 1 }}>
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--gray)",
              }}
            >
              {filteredProducts.length} products
            </span>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--black)",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="new">New Arrivals</option>
              </select>

              {/* Grid toggle */}
              <button
                onClick={() => setGridCols(4)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: gridCols === 4 ? 1 : 0.4,
                }}
              >
                <Grid3X3 size={18} color="var(--black)" />
              </button>
              <button
                onClick={() => setGridCols(2)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  opacity: gridCols === 2 ? 1 : 0.4,
                }}
              >
                <Grid2X2 size={18} color="var(--black)" />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                color: "var(--gray)",
                fontFamily: "var(--font-body)",
              }}
            >
              <SlidersHorizontal size={32} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p>No products match your filters.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                gap: "1.5rem",
                transition: "grid-template-columns 0.3s ease",
              }}
            >
              {filteredProducts.map((product, i) => (
                <div
                  key={product.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(i % 8) * 0.06}s`, opacity: 0 }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
