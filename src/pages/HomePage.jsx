import Hero from "../components/Hero";
import CategoryCards from "../components/CategoryCards";
import FeaturedCollection from "../components/FeaturedCollection";
import AIFeatures from "../components/AIFeatures";

export default function HomePage({ onNavigate }) {
  return (
    <main>
      <Hero onNavigate={onNavigate} />
      <CategoryCards onNavigate={onNavigate} />
      <FeaturedCollection />
      <AIFeatures />
    </main>
  );
}
