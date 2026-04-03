import { Sparkles } from "lucide-react";
import { featuredProducts } from "../data/products";
import ProductCard from "./ProductCard";

export default function FeaturedCollection() {
  return (
    <section
      style={{
        padding: "5rem 2rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div
            className="flex items-center gap-2 mb-3"
          >
            <Sparkles size={14} color="var(--gray)" />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "var(--gray)",
                textTransform: "uppercase",
              }}
            >
              AI CURATED
            </span>
          </div>
          <h2 className="section-title">Featured Collection</h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--gray)",
            maxWidth: "300px",
            lineHeight: 1.6,
            textAlign: "right",
          }}
        >
          Handpicked by our AI stylist based on trending styles and customer favorites
        </p>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
        }}
        className="grid-cols-2 md:grid-cols-4"
      >
        {featuredProducts.map((product, i) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
