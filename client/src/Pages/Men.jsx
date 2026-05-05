import React from 'react';

const Men = () => {
  return (
    <div className="pt-32 pb-20 px-6 md:px-12 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">
            Men's Collection
          </h1>
          <p className="text-gray-400 mt-4 italic text-lg">
            Curated styles for the modern gentleman.
          </p>
        </div>
        
        {/* We will add the FilterSidebar and ProductGrid here next */}
        <div className="border-2 border-dashed border-gray-100 rounded-xl h-96 flex items-center justify-center">
          <p className="text-gray-300 font-bold uppercase tracking-widest">
            Products Coming Soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default Men;