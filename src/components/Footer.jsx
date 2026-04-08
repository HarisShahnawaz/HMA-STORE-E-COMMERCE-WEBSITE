import { Sparkles } from "lucide-react";

const footerSections = [
  {
    title: "SHOP",
    links: ["Men", "Women", "Children", "New Arrivals", "Sale"],
  },
  {
    title: "HELP",
    links: ["Contact Us", "FAQs", "Shipping", "Returns", "Size Guide"],
  },
  {
    title: "COMPANY",
    links: ["About Us", "Careers", "Sustainability", "Press"],
  },
  {
    title: "LEGAL",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--cream)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 2rem 2rem",
      }}
    >
      <div className="max-wd-350 mx-auto">
        {/* Main Footer Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr repeat(4, 1fr)",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
          className="grid-cols-1 md:grid-cols-5"
        >
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--black)",
                }}
              >
                HMA-Store
              </span>
              <Sparkles size={15} color="var(--black)" />
            </div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--gray)",
                lineHeight: 1.7,
                maxWidth: "200px",
              }}
            >
              AI-powered fashion for the modern family. Discover your perfect style with intelligent
              recommendations.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "var(--black)",
                  marginBottom: "1.25rem",
                }}
              >
                {section.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--gray)",
                        textDecoration: "none",
                      }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--gray)",
            }}
          >
            © 2026 LUXE. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Twitter", "Pinterest"].map((social) => (
              <a
                key={social}
                href="#"
                className="footer-link"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--gray)",
                  textDecoration: "none",
                }}
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
