import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <main className="min-h-screen bg-background px-4 md:px-12 py-10 max-w-360 mx-auto">

      {/* ── Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Search size={16} className="text-black/40" />
          <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-black/40">Search Results</p>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-black text-foreground">
          "{query}"
        </h1>
        {!isLoading && (
          <p className="text-[13px] text-black/40 mt-1">
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
        )}
      </div>

      {/* ── Loading ── */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ── No Results ── */}
      {!isLoading && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Sparkles size={32} className="text-red-300 mb-4" />
          <p className="font-serif text-xl font-black text-gray-800 mb-2">No products found</p>
          <p className="text-[13px] text-black/40 mb-6">
            We couldn't find anything for "{query}"
          </p>
          <Link
            to="/"
            className="text-[12px] font-bold uppercase tracking-[0.2em] border border-black px-6 py-2.5 hover:bg-black hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* ── Results Grid ── */}
      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {results.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <span className="bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-red-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                      Sale
                    </span>
                  )}
                  {product.aiRecommended && (
                    <span className="bg-black/70 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
                      <Sparkles size={8} /> AI Pick
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <p className="text-[10px] uppercase tracking-[0.15em] text-black/40 font-bold mb-1 capitalize">
                {product.category}
              </p>
              <p className="text-[14px] font-semibold text-gray-800 mb-1 leading-snug line-clamp-2 group-hover:underline underline-offset-2">
                {product.name}
              </p>
              <div className="flex items-center gap-2 mt-auto">
                <p className="text-[14px] font-bold text-gray-900">
                  Rs. {product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-[12px] text-gray-400 line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}