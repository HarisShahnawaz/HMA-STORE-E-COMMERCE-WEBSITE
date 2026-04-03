import ProductGrid from "../components/ProductGrid";
import { menProducts, womenProducts, childrenProducts } from "../data/products";

const saleProducts = [...menProducts, ...womenProducts, ...childrenProducts].filter(
  (p) => p.badge === "Sale"
);

export default function SalePage() {
  return (
    <main>
      <ProductGrid
        title="Sale"
        subtitle="Exceptional pieces at exceptional prices. Shop our curated sale selection before they're gone."
        products={saleProducts}
      />
    </main>
  );
}
