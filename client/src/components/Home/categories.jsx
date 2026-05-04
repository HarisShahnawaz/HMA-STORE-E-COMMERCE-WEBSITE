import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Men",
    href: "/men",
    image: "/images/men-category.jpg",
    count: "2,450+ Products",
    subtitle: "Sophisticated essentials for the modern man",
  },
  {
    name: "Women",
    href: "/women",
    image: "/images/women-category.jpg",
    count: "3,000+ Products",
    subtitle: "Elegant pieces that define your style",
  },
  {
    name: "Children",
    href: "/kids",
    image: "/images/children-category.jpg",
    count: "1,800+ Products",
    subtitle: "Playful fashion for little ones",
  },
];

export function Categories() {
  return (
    <section className="w-full">

      {/* Section Header */}
      <div className="text-center py-16 px-6">
        <h2 className="font-serif text-[2.8rem] md:text-[3.5rem] font-black text-foreground mb-3">
          Shop by Category
        </h2>
        <p className="font-sans text-sm md:text-base text-muted-foreground">
          Explore our curated collections designed for every member of your family
        </p>
      </div>
{/* Cards Grid - with gaps and rounded corners */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-6 pb-16">
  {categories.map((cat) => (
    <Link
      key={cat.name}
      to={cat.href}
      className="group relative overflow-hidden rounded-2xl aspect-[3/4] md:aspect-auto md:h-[85vh] block"
    >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              {/* Product count */}
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mb-2">
                {cat.count}
              </p>

              {/* Category name */}
              <h3 className="font-serif text-[2.2rem] md:text-[2.8rem] font-black mb-1 leading-tight">
                {cat.name}
              </h3>

              {/* Subtitle */}
              <p className="font-sans text-[13px] text-white/80 mb-4">
                {cat.subtitle}
              </p>

              {/* Shop link */}
              <div className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover:gap-3 transition-all duration-300">
                Shop Collection
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}