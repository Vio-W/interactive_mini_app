import { useState } from 'react';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
}

interface NewProductForm {
  name: string;
  price: string;
}

interface FormErrors {
  name?: string;
  price?: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Wireless Mouse', price: 19.99, inStock: true, onSale: true },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99, inStock: true, onSale: false },
  { id: 3, name: 'USB-C Hub', price: 34.5, inStock: false, onSale: true },
  { id: 4, name: 'Webcam 1080p', price: 45.0, inStock: true, onSale: false },
  { id: 5, name: 'Laptop Stand', price: 29.99, inStock: false, onSale: false },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [form, setForm] = useState<NewProductForm>({ name: '', price: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const displayedProducts = inStockOnly
    ? products.filter((p) => p.inStock)
    : products;

  const saleCount = products.filter((p) => p.onSale).length;

  function validateForm(data: NewProductForm): FormErrors {
    const newErrors: FormErrors = {};

    if (data.name.trim() === '') {
      newErrors.name = 'Name cannot be empty.';
    }

    const priceValue = Number(data.price);
    if (data.price.trim() === '' || Number.isNaN(priceValue)) {
      newErrors.price = 'Price must be a valid number.';
    }

    return newErrors;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: form.name.trim(),
      price: Number(form.price),
      inStock: true,
      onSale: false,
    };

    setProducts((prev) => [...prev, newProduct]);
    setForm({ name: '', price: '' });
    setErrors({});
  }

  return (
    <div className="app">
      <h1>Product Catalog</h1>

      <div className="controls">
        <p>{displayedProducts.length} products</p>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In stock only
        </label>
        {saleCount > 0 && <p className="sale-counter">{saleCount} on sale</p>}
      </div>

      <div className="grid">
        {displayedProducts.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <span className={product.inStock ? 'badge in-stock' : 'badge sold-out'}>
              {product.inStock ? 'In stock' : 'Sold out'}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add product</h2>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={form.price}
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}

export default App;