import React from 'react';
import { Sparkles, Palette, BarChart3, Wand2, ArrowRight } from 'lucide-react';

const aiFeatures = [
  {
    icon: <Wand2 className="w-5 h-5" />,
    title: "AI Style Recommendations",
    desc: "Get personalized outfit suggestions based on your preferences, body type, and occasion."
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Virtual Try-On",
    desc: "See how clothes look on you before you buy with our AI-powered virtual fitting room."
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Size Predictor",
    desc: "Our AI analyzes your measurements to recommend the perfect size every time."
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Smart Wardrobe",
    desc: "Build complete outfits from your purchases with intelligent mix-and-match suggestions."
  }
];

export default function AIFeatures() {
  return (
    <div className="w-full bg-background">
      
      {/* --- Section 1: AI Features Grid --- */}
      <section className="max-w-360 mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-white shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#E56B5E]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">
              Powered by AI
            </span>
          </div>
          
          <h2 className="font-serif text-[2.5rem] md:text-[4.5rem] font-black text-foreground mb-4 leading-tight">
            Shopping, Reimagined
          </h2>
          <p className="font-sans text-muted-foreground text-sm md:text-lg max-w-2xl">
            Experience the future of fashion retail with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-8 border border-border group-hover:scale-110 transition-transform">
                <div className="text-foreground">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section 2: Full-Width Community Section (NO GAPS) --- */}
      {/* Fixed: bg-[#111111] is on the section, and pb-0 ensures it touches the footer/bottom */}
      <section className="w-full bg-[#111111] py-16 md:py-24 text-center relative overflow-hidden flex flex-col items-center">
        <div className="w-full max-w-360 px-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-8">
            <Sparkles className="w-4 h-4 text-white/70" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
              Join the HMA-Store Community
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-[2.5rem] md:text-[4.5rem] font-black text-white mb-6 leading-[1.1]">
            Stay ahead of the trends
          </h2>
          
          <p className="font-sans text-white/60 text-sm md:text-lg max-w-xl mx-auto mb-12">
            Subscribe for exclusive AI-curated style picks, early access to sales, and 10% off your first order.
          </p>

          {/* Form */}
          <form 
            className="max-w-lg mx-auto flex flex-col md:flex-row gap-4 items-center" 
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full md:flex-1 px-8 py-4 md:py-5 rounded-full bg-[#F5F5F5] text-foreground font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#E56B5E]/50 transition-all border-none"
            />
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#E56B5E] hover:bg-[#d45a4d] text-white font-sans text-[13px] font-bold px-10 py-4 md:py-5 rounded-full transition-all whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-[10px] text-white/40 font-sans tracking-wide">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from HMA-Store.
          </p>
        </div>
      </section>
    </div>
  );
}