import SortDropdown from "./SortDropdown";

export default function CollectionHeader({ title, description, count }) {
  return (
    <div className="mb-12">
      {/* Dynamic Title and Description */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif text-6xl md:text-7xl font-black text-black mb-4 uppercase tracking-tighter">
          {title}
        </h1>
        <p className="text-gray-500 text-sm md:text-base italic leading-relaxed px-4">
          {description}
        </p>
      </div>

      {/* Stats and Sort Bar */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
          {count} Products Found
        </span>
        <SortDropdown />
      </div>
    </div>
  );
}