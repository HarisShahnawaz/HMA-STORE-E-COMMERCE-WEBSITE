import { Wand2, Palette, BarChart2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Style Recommendations",
    description:
      "Get personalized outfit suggestions tailored to your taste, body type, and lifestyle.",
  },
  {
    icon: Palette,
    title: "Virtual Try-On",
    description:
      "See how clothes look on you before you buy with our AI-powered virtual fitting room.",
  },
  {
    icon: BarChart2,
    title: "Size Predictor",
    description:
      "Our AI analyzes your measurements to recommend the perfect fit every time.",
  },
  {
    icon: Sparkles,
    title: "Smart Wardrobe",
    description:
      "Build complete outfits from your purchases with intelligent mix-and-match suggestions.",
  },
];

export default function AIFeatures() {
  return (
    <section
      style={{
        backgroundColor: "var(--cream-dark)",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "var(--black)",
              marginBottom: "1rem",
            }}
          >
            Shopping, Reimagined
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--gray)",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Experience the future of fashion retail with our cutting-edge AI technology
          </p>
        </div>

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
          className="grid-cols-1 md:grid-cols-4"
        >
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="animate-fade-in-up"
                style={{
                  backgroundColor: "var(--cream)",
                  borderRadius: "12px",
                  padding: "2.5rem 2rem",
                  border: "1px solid var(--border)",
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    backgroundColor: "var(--cream-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <Icon size={22} color="var(--black)" />
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--black)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--gray)",
                    lineHeight: 1.65,
                  }}
                >
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
