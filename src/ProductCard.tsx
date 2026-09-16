import type { PublicProduct } from './types';

interface ProductCardProps {
  product: PublicProduct;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <p className="category">{product.category ?? 'Uncategorized'}</p>
      <span className={product.inStock ? 'badge in-stock' : 'badge sold-out'}>
        {product.inStock ? 'In stock' : 'Sold out'}
      </span>
    </div>
  );
}

export default ProductCard;