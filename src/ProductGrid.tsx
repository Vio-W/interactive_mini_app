import type { Product } from './types';
import { toPublicProduct } from './types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={toPublicProduct(product)} />
      ))}
    </div>
  );
}

export default ProductGrid;