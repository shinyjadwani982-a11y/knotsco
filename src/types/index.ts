import { Product } from '../data/products';

export interface CartItem {
  id: string; // unique cart line id
  product: Product;
  quantity: number;
  customization?: {
    shadeName?: string;
    monogram?: string;
    specialNote?: string;
  };
}

export interface CustomPieceOrder {
  baseItem: string;
  baseCategory: string;
  shadeName: string;
  shadeHex: string;
  monogramText: string;
  giftTagNote: string;
  price: number;
}

export interface FilterState {
  category: string;
  personality: string | null;
  mood: string | null;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
}
