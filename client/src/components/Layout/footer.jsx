import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    /* 1. Changed border-t to border-black for a solid black line */
    <footer className="w-full bg-white border-t border-black font-sans">
      <div className="max-w-360 mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-6">
              <span className="font-serif text-2xl font-black tracking-tight text-foreground">
                HMA-Store
              </span>
              <Sparkles className="w-4 h-4 text-[#E56B5E]" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-60">
              AI-powered fashion for the modern family. Discover your perfect style with intelligent recommendations.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold text-[13px] uppercase tracking-widest text-foreground mb-6">Shop</h4>
            <ul className="space-y-4">
              {['Men', 'Women', 'Children', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item}>
                  {/* 2. Added hover:text-black for the black hover effect */}
                  <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Column */}
          <div>
            <h4 className="font-bold text-[13px] uppercase tracking-widest text-foreground mb-6">Help</h4>
            <ul className="space-y-4">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold text-[13px] uppercase tracking-widest text-foreground mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Press'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-[13px] uppercase tracking-widest text-foreground mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-black transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        {/* 3. Changed bottom divider to border-black as well */}
        <div className="mt-20 pt-8 border-t border-black flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-muted-foreground">
            © {currentYear} HMA-Store By Haris All rights reserved.
          </p>
          
          <div className="flex gap-8">
            {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-[13px] font-medium text-muted-foreground hover:text-black transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}