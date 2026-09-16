import { useState, useEffect } from 'react';
import type { Product } from './types';
import ProductGrid from './ProductGrid';
import AddProductForm from './AddProductForm';
import './App.css';

const initialProducts: Product[] = [
  { id: 1, internalSku: 'SKU-001', name: 'Wireless Mouse', price: 19.99, inStock: true, onSale: true, category: 'Accessories' },
  { id: 2, internalSku: 'SKU-002', name: 'Mechanical Keyboard', price: 89.99, inStock: true, onSale: false, category: 'Accessories' },
  { id: 3, internalSku: 'SKU-003', name: 'USB-C Hub', price: 34.5, inStock: false, onSale: true, category: 'Accessories' },
  { id: 4, internalSku: 'SKU-004', name: 'Webcam 1080p', price: 45.0, inStock: true, onSale: false, category: 'Video' },
  { id: 5, internalSku: 'SKU-005', name: 'Laptop Stand', price: 29.99, inStock: false, onSale: false, category: 'Furniture' },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuggestion() {
      try {
        const response = await fetch('https://dummyjson.com/products/1');
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setSuggestion(data?.title ?? null);
      } catch (err) {
        console.error('Failed to fetch product suggestion:', err);
        setSuggestion(null);
      }
    }

    fetchSuggestion();
  }, []);

  function handleAddProduct(newProduct: Product) {
    setProducts((prev) => [...prev, newProduct]);
  }

  const displayedProducts = inStockOnly ? products.filter((p) => p.inStock) : products;
  const saleCount = products.filter((p) => p.onSale).length;

  return (
    <div className="app">
      <h1>Product Catalog</h1>

      <div className="controls">
        <p>{displayedProducts.length} products</p>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInStockOnly(e.target.checked)}
          />
          In stock only
        </label>
        {saleCount > 0 && <p className="sale-counter">{saleCount} on sale</p>}
        {suggestion && <p className="suggestion">Today's pick: {suggestion}</p>}
      </div>

      <ProductGrid products={displayedProducts} />
      <AddProductForm onAdd={handleAddProduct} />
    </div>
  );
}

export default App;