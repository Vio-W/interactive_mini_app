import { useState } from 'react';
import type { ProductDraft, FormErrors, Product } from './types';

interface AddProductFormProps {
  onAdd: (product: Product) => void;
}

function AddProductForm({ onAdd }: AddProductFormProps) {
  const [draft, setDraft] = useState<ProductDraft>({});
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(data: ProductDraft): FormErrors {
    const newErrors: FormErrors = {};

    const name = data.name?.trim() ?? '';
    if (name === '') {
      newErrors.name = 'Name cannot be empty.';
    }

    const rawPrice = data.price ?? '';
    const priceValue = Number(rawPrice);
    if (rawPrice.trim() === '' || Number.isNaN(priceValue)) {
      newErrors.price = 'Price must be a valid number.';
    }

    return newErrors;
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDraft((prev) => ({ ...prev, name: e.target.value }));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDraft((prev) => ({ ...prev, price: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(draft);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      internalSku: `SKU-${Date.now()}`,
      name: draft.name?.trim() ?? '',
      price: Number(draft.price ?? '0'),
      inStock: true,
      onSale: false,
    };

    onAdd(newProduct);
    setDraft({});
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Add product</h2>

      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={draft.name ?? ''} onChange={handleNameChange} />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="price">Price</label>
        <input id="price" type="text" value={draft.price ?? ''} onChange={handlePriceChange} />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>

      <button type="submit">Add product</button>
    </form>
  );
}

export default AddProductForm;