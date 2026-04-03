import ProductGrid from "../components/ProductGrid";
import { childrenProducts } from "../data/products";

export default function ChildrenPage() {
  return (
    <main>
      <ProductGrid
        title="Children"
        subtitle="Playful, comfortable fashion designed for little ones. Quality pieces that grow with your child's sense of adventure."
        products={childrenProducts}
      />
    </main>
  );
}
