
export interface BrandPhilosophy {
  title: string;
  description: string;
  motto: string;
}

export enum ViewState {
  HOME = 'HOME',
  COLLECTION = 'COLLECTION',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  PHILOSOPHY = 'PHILOSOPHY',
  ACCOUNT = 'ACCOUNT'
}

export interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  description?: string;
  material?: string;
  images: string[];
  sizes?: number[];
  color?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  size: number;
  quantity: number;
}
