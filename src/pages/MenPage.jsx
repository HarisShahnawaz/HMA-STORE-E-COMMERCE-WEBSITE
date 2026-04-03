import ProductGrid from "../components/ProductGrid";
import { menProducts } from "../data/products";

export default function MenPage() {
  return (
    <main>
      <ProductGrid
        title="Men"
        subtitle="Sophisticated essentials crafted for the modern man. Discover tailored pieces that blend timeless style with contemporary comfort."
        products={menProducts}
      />
    </main>
  );
}
