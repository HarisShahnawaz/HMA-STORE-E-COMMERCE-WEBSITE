import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full bg-background">
      <div className="max-w-360 mx-auto px-6 md:px-12">

        <div className="flex flex-col items-center text-center pt-14 md:pt-24 pb-10 md:pb-16">

          {/* AI Badge Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background shadow-sm mb-7 md:mb-10">
            <Sparkles className="h-3 w-3 shrink-0" style={{ color: 'var(--brand-accent)' }} />
            <span className="font-sans text-[9px] md:text-[11px] font-semibold tracking-[0.12em] uppercase text-foreground">
              AI-Powered Shopping Experience
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="font-serif font-black text-foreground mb-4 md:mb-6
                         text-[2.6rem] leading-[1.05]
                         md:text-[4.5rem]
                         lg:text-[5.5rem]
                         max-w-[280px] md:max-w-2xl lg:max-w-4xl">
            Discover your
            <br />
            <em className="italic">perfect style</em>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[13px] md:text-base text-muted-foreground leading-relaxed max-w-[260px] md:max-w-xl mb-8 md:mb-12">
            Experience the future of fashion with our AI-powered
            recommendations. Curated collections for Men, Women, and Children.
          </p>

          {/* CTA Buttons - compact on mobile */}
          <div className="flex flex-col items-center gap-3 w-full md:flex-row md:justify-center md:gap-4">

            {/* Shop Now */}
            <Link
              to="/women"
              className="w-[220px] md:w-auto flex items-center justify-center gap-2
                         bg-foreground text-background
                         font-sans text-[11px] font-semibold
                         px-7 py-3 rounded-full
                         hover:bg-black hover:scale-105
                         transition-all duration-200"
            >
              Shop Now
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Try AI Stylist - outline */}
            <Link
              to="/men"
              className="w-[220px] md:w-auto flex items-center justify-center gap-2
                         bg-background text-foreground
                         border border-border
                         font-sans text-[11px] font-semibold
                         px-7 py-3 rounded-full
                         hover:border-foreground hover:scale-105
                         transition-all duration-200"
            >
              <Sparkles className="h-3 w-3" style={{ color: 'var(--brand-accent)' }} />
              Try AI Stylist
            </Link>
          </div>
        </div>

        {/* Category Links */}
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-16 pb-12 md:pb-16">
          {[
            { name: "Shop Men", href: "/men" },
            { name: "Shop Women", href: "/women" },
            { name: "Shop Children", href: "/kids" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="group flex items-center gap-2
                         font-sans text-[10px] font-bold uppercase tracking-[0.25em]
                         text-black/50 transition-all duration-200"
              onMouseEnter={e => e.currentTarget.style.color = 'var(--brand-accent)'}
              onMouseLeave={e => e.currentTarget.style.color = ''}
            >
              {item.name}
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}