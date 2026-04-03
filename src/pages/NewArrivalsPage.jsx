import ProductGrid from "../components/ProductGrid";
import { menProducts, womenProducts, childrenProducts } from "../data/products";

const newArrivals = [...menProducts, ...womenProducts, ...childrenProducts].filter(
  (p) => p.badge === "New"
);

export default function NewArrivalsPage() {
  return (
    <main>
      <ProductGrid
        title="New Arrivals"
        subtitle="Fresh styles just landed. Be the first to discover our latest collections across all categories."
        products={newArrivals}
      />
    </main>
  );
}
