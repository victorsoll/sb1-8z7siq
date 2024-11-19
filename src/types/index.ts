export interface Product {
  id: string;
  name: string;
  purchasePrice: number;
  purchaseDate: string;
  imageUrl: string;
  status: 'in_stock' | 'sold';
  salePrice?: number;
  saleDate?: string;
  category: 'sneakers' | 'clothing' | 'objects' | 'tickets';
  description?: string;
}

export interface Sale {
  id: string;
  productId: string;
  salePrice: number;
  saleDate: string;
  profit: number;
}