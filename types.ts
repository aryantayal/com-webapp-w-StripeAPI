export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export interface ProductListProps {
  products: Product[];
}
export interface CartItem extends Product {
  quantity: number;
}
export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
}
