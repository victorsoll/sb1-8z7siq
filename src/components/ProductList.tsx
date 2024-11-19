import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-semibold mb-2">{product.name}</h3>
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">
                Prix d'achat: <span className="text-white">{product.purchasePrice}€</span>
              </p>
              <p className="text-gray-400">
                Date: <span className="text-white">
                  {format(new Date(product.purchaseDate), 'dd/MM/yyyy', { locale: fr })}
                </span>
              </p>
              <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                product.status === 'in_stock' 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-red-500/20 text-red-500'
              }`}>
                {product.status === 'in_stock' ? 'En stock' : 'Vendu'}
              </div>
              {product.status === 'sold' && (
                <p className="text-gray-400">
                  Prix de vente: <span className="text-white">{product.salePrice}€</span>
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;