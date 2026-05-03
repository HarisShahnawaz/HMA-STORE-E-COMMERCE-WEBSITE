import { Link } from "react-router-dom";

const features = [
  {
    emoji: "🚀",
    title: "Fast Delivery",
    desc: "Express shipping to your doorstep within 24–48 hours, anywhere in the country.",
  },
  {
    emoji: "✨",
    title: "AI Recommendations",
    desc: "Our AI stylist learns your taste and suggests outfits perfectly matched to you.",
  },
  {
    emoji: "🔒",
    title: "Secure Payments",
    desc: "Shop with confidence. All transactions are encrypted and fully protected.",
  },
];

const stats = [
  { value: "7,000+", label: "Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100%", label: "AI Curated" },
];

export function About() {
  return (
    <section className="w-full bg-background">

      {/* About Header */}
      <div className="max-w-360 mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8 md:pb-12">

        {/* WHO WE ARE label */}
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center mb-4">
          Who We Are
        </p>

        {/* About Us heading with underline */}
       <div className="flex flex-col items-center mb-12 md:mb-16">
  <h2 className="font-serif text-[3rem] md:text-[4rem] font-black text-foreground mb-3">
    About Us
  </h2>
  <div className="w-12 h-0.5 bg-foreground" />
</div>
      </div>

      {/* Full-width Store Image */}
      <div className="w-full overflow-hidden mb-0">
        <img
          src="/aboutimage.png"
          alt="HMA-Store boutique"
          className="w-full h-[280px] md:h-[500px] lg:h-[600px] object-cover"
        />
      </div>

      {/* Fashion Meets Intelligence */}
      <div className="max-w-360 mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-3xl">
          <h3 className="font-serif text-[2rem] md:text-[3.5rem] font-black text-foreground leading-tight mb-8">
            Fashion Meets{" "}
            <em className="italic text-foreground/30 font-black">
              Intelligence
            </em>
          </h3>

          <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
            We believe fashion should be effortless, intelligent, and accessible to
            everyone. HMA-Store was built to bring you the finest curated collections
            for Men, Women, and Children — all powered by cutting-edge AI technology.
          </p>

          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
            From timeless classics to the latest trends, every product is handpicked
            by our AI stylist to match your personality, lifestyle, and budget. We are
            committed to making fashion fun, personal, and accessible for the whole family.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-360 mx-auto px-6 md:px-12 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center
                         border border-border rounded-xl p-8 md:p-10
                         hover:shadow-sm transition-shadow duration-200"
            >
              <span className="text-3xl mb-4">{f.emoji}</span>
              <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.15em] text-foreground mb-3">
                {f.title}
              </h4>
              <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Stats Bar */}
      <div className="w-full bg-foreground py-14 md:py-16">
        <div className="max-w-360 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center">
                <span className="font-serif text-[2rem] md:text-[3.5rem] font-black text-background leading-none mb-2">
                  {s.value}
                </span>
                <span className="font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-background/50">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-background py-20 md:py-24 px-6">
        <div className="flex flex-col items-center text-center">
          <h3 className="font-serif text-[1.8rem] md:text-[2.5rem] font-black text-foreground mb-3">
            Ready to discover your style?
          </h3>
          <p className="font-sans text-sm text-muted-foreground mb-8 max-w-sm">
            Explore thousands of AI-curated pieces for the whole family.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/women"
              className="w-[180px] flex items-center justify-center
                         bg-foreground text-background
                         font-sans text-[11px] font-bold uppercase tracking-[0.2em]
                         px-8 py-3 rounded-full
                         hover:bg-black transition-all duration-200"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="w-[180px] flex items-center justify-center
                         border border-border text-foreground
                         font-sans text-[11px] font-bold uppercase tracking-[0.2em]
                         px-8 py-3 rounded-full
                         hover:border-foreground transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}