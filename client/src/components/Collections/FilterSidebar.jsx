export default function FilterSidebar() {
  const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
      <div>
        <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-black mb-6 border-b pb-2">
          Category
        </h3>
        <div className="space-y-4">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black accent-black" 
              />
              <span className="ml-3 text-[13px] font-medium text-gray-500 group-hover:text-black transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-8">
        <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-black mb-6 border-b pb-2">
          Price Range
        </h3>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400">
          <span>RS 0</span>
          <span>RS 10,000</span>
        </div>
      </div>

      <button className="w-full py-4 text-[11px] font-black uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-all duration-300">
        Reset Filters
      </button>
    </aside>
  );
}