import { Sparkles } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const CATEGORIES = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"];

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceMax,
  onPriceChange,
  selectedSizes,
  onSizeChange,
  showAiOnly,
  onAiToggle,
  onReset,
}) {
  return (
    <div className="space-y-10 pr-4">

      {/* Category */}
      <div className="space-y-5">
        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] border-b border-border pb-3">
          Category
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-0 cursor-pointer accent-black"
              />
              <span className="font-sans text-[13px] text-muted-foreground group-hover:text-foreground transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-5">
        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] border-b border-border pb-3">
          Price Range
        </h3>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max={10000}
            value={priceMax}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between mt-3">
            <span className="text-[11px] font-bold text-muted-foreground tracking-tighter">Rs 0</span>
            <span className="text-[11px] font-bold text-muted-foreground tracking-tighter">
              Rs {priceMax.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Size */}
      <div className="space-y-5">
        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] border-b border-border pb-3">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onSizeChange(size)}
                className={`w-12 h-10 rounded-lg text-[11px] font-black uppercase tracking-wider border transition-all duration-200
                  ${active
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-border hover:border-black"
                  }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Picks */}
      <div className="space-y-4 bg-muted/40 rounded-2xl p-4 border border-border/50">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" style={{ color: "var(--brand-accent)" }} />
          <h3 className="font-sans text-[12px] font-black uppercase tracking-[0.15em]">AI Picks</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Show only items recommended for your style
        </p>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={onAiToggle}
            className={`relative w-10 h-5 rounded-full transition-colors duration-300 cursor-pointer ${
              showAiOnly ? "bg-black" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                showAiOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-[12px] font-bold text-foreground">Show AI recommendations</span>
        </label>
      </div>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-3 border border-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-lg"
      >
        Reset Filters
      </button>
    </div>
  );
}