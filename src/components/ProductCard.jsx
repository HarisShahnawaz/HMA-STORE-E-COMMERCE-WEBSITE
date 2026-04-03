import { useState } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";

export default function ProductCard({ product }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getBadgeStyle = (badge) => {
    if (badge === "Sale") return { background: "var(--red-badge)", color: "#fff" };
    if (badge === "New") return { background: "var(--black)", color: "#fff" };
    if (badge === "AI Pick") return { background: "rgba(255,255,255,0.92)", color: "var(--black)", border: "1px solid var(--border)" };
    return {};
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Image Container */}
      <div
        style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          aspectRatio: "3/4",
          backgroundColor: "var(--cream-dark)",
          marginBottom: "0.875rem",
        }}
      >
        {/* Skeleton */}
        {!imgLoaded && (
          <div className="skeleton" style={{ position: "absolute", inset: 0 }} />
        )}

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.4s ease, transform 0.5s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              padding: "4px 10px",
              borderRadius: "4px",
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              ...getBadgeStyle(product.badge),
            }}
          >
            {product.badge === "AI Pick" && <Sparkles size={11} />}
            {product.badge}
          </div>
        )}

        {/* Add to Bag — shown on hover */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{
              background: "var(--white)",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <ShoppingBag size={17} color="var(--black)" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            color: "var(--gray)",
            marginBottom: "2px",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--black)",
            marginBottom: "4px",
          }}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--black)",
            }}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--gray-light)",
                textDecoration: "line-through",
              }}
            >
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
