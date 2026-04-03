import ProductGrid from "../components/ProductGrid";
import { womenProducts } from "../data/products";

export default function WomenPage() {
  return (
    <main>
      <ProductGrid
        title="Women"
        subtitle="Elegant pieces thoughtfully designed for the modern woman. Discover collections that celebrate your unique sense of style."
        products={womenProducts}
      />
    </main>
  );
}
