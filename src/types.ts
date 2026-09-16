export interface Product {
  id: number;
  internalSku: string;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
  category?: string;
}

// Strip the internal-only field before anything customer-facing sees it
export type PublicProduct = Omit<Product, 'internalSku'>;

export function toPublicProduct(product: Product): PublicProduct {
  const { internalSku, ...publicFields } = product;
  void internalSku;
  return publicFields;
}

export interface ProductFormFields {
  name: string;
  price: string;
}

// Partial because the user may have filled in neither field yet
export type ProductDraft = Partial<ProductFormFields>;

export interface FormErrors {
  name?: string;
  price?: string;
}