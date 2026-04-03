import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero({ onNavigate }) {
  return (
    <section
      style={{
        backgroundColor: "var(--cream)",
        textAlign: "center",
        padding: "5rem 2rem 4rem",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      {/* AI Badge */}
      <div
        className="animate-fade-in-up"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid var(--border)",
          borderRadius: "100px",
          padding: "6px 18px",
          marginBottom: "2.5rem",
          backgroundColor: "rgba(255,255,255,0.6)",
        }}
      >
        <Sparkles size={14} style={{ color: "var(--black)" }} />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            letterSpacing: "0.06em",
            color: "var(--black)",
          }}
        >
          AI-Powered Shopping Experience
        </span>
      </div>

      {/* Hero Title */}
      <div className="animate-fade-in-up delay-100">
        <h1 className="hero-title" style={{ marginBottom: "1.5rem" }}>
          Discover your
          <br />
          <em>perfect style</em>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="animate-fade-in-up delay-200"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          color: "var(--gray)",
          maxWidth: "520px",
          margin: "0 auto 3rem",
          lineHeight: 1.7,
        }}
      >
        Experience the future of fashion with our AI-powered recommendations. Curated collections
        for Men, Women, and Children.
      </p>

      {/* CTA Buttons */}
      <div
        className="animate-fade-in-up delay-300 flex items-center justify-center gap-4 flex-wrap"
      >
        <button
          onClick={() => onNavigate && onNavigate("women")}
          className="btn-primary flex items-center gap-2"
          style={{
            padding: "14px 32px",
            borderRadius: "100px",
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
          }}
        >
          Shop Now
          <ArrowRight size={16} />
        </button>
        <button
          className="btn-outline flex items-center gap-2"
          style={{
            padding: "14px 32px",
            borderRadius: "100px",
            fontSize: "0.875rem",
            letterSpacing: "0.04em",
          }}
        >
          <Sparkles size={15} />
          Try AI Stylist
        </button>
      </div>
    </section>
  );
}
