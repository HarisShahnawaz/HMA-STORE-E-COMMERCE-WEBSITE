import SortDropdown from "./SortDropdown";

export default function CollectionHeader({ title, description, count }) {
  return (
    <div className="text-center pt-8 pb-12">
      {/* Smaller, precise font sizes from your v0 inspector */}
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      {/* Responsive Toolbar */}
      <div className="flex justify-between items-end mt-12 pb-4 border-b border-border/50">
        <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/70">
          {count} products
        </div>
        <div className="flex items-center gap-4">
          <SortDropdown />
          {/* Grid Toggle Icons seen in your screenshot */}
          <div className="hidden md:flex items-center gap-1 border-l border-border pl-4 ml-2">
            <div className="w-4 h-4 border border-foreground/20 rounded-[2px]" />
            <div className="w-4 h-4 border border-foreground/80 rounded-[2px] bg-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}