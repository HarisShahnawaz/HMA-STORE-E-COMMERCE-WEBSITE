import { useState } from "react";
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

const team = [
  {
    name: "Haris Shahnawaz",
    role: "Project Leader & Full Stack Developer",
    bio: "Drives the project vision, builds robust MERN architectures, designs APIs, and handles production deployments.",
    initials: "HS",
    // Premium dark/neutral tone marble colors matching HMA Store
    gradient: "from-neutral-950 via-neutral-800 to-stone-700",
  },
  {
    name: "Mohsin Aslam",
    role: "UI/UX Designer & Developer",
    bio: "Crafts elegant user journeys, establishes the visual layout system, and bridges frontend interaction with clean code.",
    initials: "MA",
    gradient: "from-stone-900 via-neutral-800 to-zinc-600",
  },
  {
    name: "Anam Maryam",
    role: "Data Analyst & Documentation Specialist",
    bio: "Manages comprehensive project documentation, structures technical assets, and oversees data collection requirements.",
    initials: "AM",
    gradient: "from-neutral-900 via-zinc-800 to-neutral-700",
  },
];

const stats = [
  { value: "7,000+", label: "Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100%", label: "AI Curated" },
];

export default function About() {
  const [hoveredMember, setHoveredMember] = useState(null);

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
          className="w-full h-70 md:h-125 lg:h-150 object-cover"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col items-center text-center
             bg-white rounded-2xl p-10 md:p-12
             shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-4xl mb-5">{f.emoji}</span>
              <h4 className="font-sans text-[13px] font-semibold text-foreground mb-3">
                {f.title}
              </h4>
              <p className="font-sans text-[13px] text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- THE TEAM SECTION --- */}
      <div className="max-w-360 mx-auto px-6 md:px-12 py-16 md:py-24 border-t border-border/40">
        <div className="flex flex-col items-center mb-16">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground text-center mb-3">
            The Minds Behind HMA
          </p>
          <h3 className="font-serif text-[2rem] md:text-[3rem] font-black text-foreground text-center mb-4">
            Meet Our Team
          </h3>
          <div className="w-8 h-0.5 bg-foreground" />
        </div>

        {/* 3-Column Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={member.name} 
              className="flex flex-col items-center text-center group"
              onMouseEnter={() => setHoveredMember(index)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              
              {/* Premium Custom Animated Gradient Avatar */}
              <div className="w-40 h-40 md:w-44 md:h-44 rounded-full mb-6 flex items-center justify-center relative overflow-hidden transition-all duration-500 transform group-hover:scale-105 shadow-md bg-neutral-900 border border-border/40 select-none cursor-pointer">
                
                {/* Background moving fluid/liquid layout */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${member.gradient} transition-transform duration-700 ${hoveredMember === index ? 'scale-125 rotate-45' : 'scale-100'}`} />
                
                {/* Decorative Tech Grid Ring overlaying the marble gradient */}
                <div className={`absolute inset-2 rounded-full border border-white/5 mix-blend-overlay transition-all duration-500 ${hoveredMember === index ? 'rotate-180 scale-95 opacity-40' : 'opacity-20'}`} />
                
                {/* Center Initials Text */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <span className={`font-serif text-3xl font-black tracking-widest text-white transition-transform duration-300 ${hoveredMember === index ? 'scale-110' : 'scale-100'}`}>
                    {member.initials}
                  </span>
                  <span className="font-sans text-[8px] font-bold uppercase tracking-[0.25em] text-white/40 mt-1">
                    Crew
                  </span>
                </div>

                {/* Lighting glow highlight across profile on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
              </div>

              <h4 className="font-serif text-xl font-bold text-foreground mb-1">
                {member.name}
              </h4>
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">
                {member.role}
              </span>
              <p className="font-sans text-[13px] text-foreground/70 leading-relaxed max-w-xs">
                {member.bio}
              </p>
            </div>
          ))}
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
              className="w-45 flex items-center justify-center
                         bg-foreground text-background
                         font-sans text-[11px] font-bold uppercase tracking-[0.2em]
                         px-8 py-3 rounded-full
                         hover:bg-black transition-all duration-200"
            >
              Shop Now
            </Link>
            <Link
              to="/sale"
              className="w-45 flex items-center justify-center
                         border border-border text-foreground
                         font-sans text-[11px] font-bold uppercase tracking-[0.2em]
                         px-8 py-3 rounded-full
                         hover:border-foreground transition-all duration-200"
            >
              View Sale
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}