import ProductCard from "./productCard";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-background">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}