export default function FilterSidebar() {
  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"];

  return (
    <div className="space-y-12 pr-4">
      {/* Category Filter */}
      <div className="space-y-6">
        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] border-b border-border pb-3">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 group cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-0 cursor-pointer" />
              <span className="font-sans text-[13px] text-muted-foreground group-hover:text-foreground transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range - Matches image_ddb81b */}
      <div className="space-y-6">
        <h3 className="font-sans text-[11px] font-black uppercase tracking-[0.2em] border-b border-border pb-3">
          Price Range
        </h3>
        <div className="px-2">
          <input type="range" className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-black" />
          <div className="flex justify-between mt-4">
            <span className="text-[11px] font-bold text-muted-foreground tracking-tighter">Rs 0</span>
            <span className="text-[11px] font-bold text-muted-foreground tracking-tighter">Rs 10,000</span>
          </div>
        </div>
      </div>

      <button className="w-full py-3 border border-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300 rounded-lg">
        Reset Filters
      </button>
    </div>
  );
}