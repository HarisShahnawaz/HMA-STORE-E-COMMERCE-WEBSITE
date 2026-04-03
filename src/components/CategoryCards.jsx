import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { categoryImages } from "../data/products";

const categories = [
  {
    key: "men",
    label: "Men",
    count: "2,450+ PRODUCTS",
    description: "Sophisticated essentials for the modern man",
    image: categoryImages.men,
  },
  {
    key: "women",
    label: "Women",
    count: "3,200+ PRODUCTS",
    description: "Elegant pieces that define your style",
    image: categoryImages.women,
  },
  {
    key: "children",
    label: "Children",
    count: "1,800+ PRODUCTS",
    description: "Playful fashion for little ones",
    image: categoryImages.children,
  },
];

export default function CategoryCards({ onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ padding: "0 0 4rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 0,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {categories.map((cat) => (
          <div
            key={cat.key}
            style={{
              position: "relative",
              height: "600px",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHovered(cat.key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNavigate && onNavigate(cat.key)}
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.label}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: hovered === cat.key ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.6s ease",
              }}
            />

            {/* Overlay */}
            <div
              className="category-card-overlay"
              style={{ position: "absolute", inset: 0 }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2.5rem",
                color: "#fff",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  marginBottom: "0.5rem",
                  opacity: 0.85,
                }}
              >
                {cat.count}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.5rem",
                }}
              >
                {cat.label}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: "1.25rem",
                }}
              >
                {cat.description}
              </p>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "none",
                }}
              >
                Shop Collection
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
