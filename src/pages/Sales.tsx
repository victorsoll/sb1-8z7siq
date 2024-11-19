import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useProductStore } from '../stores/productStore';

function Sales() {
  const products = useProductStore(state => state.products);
  const [selectedMonth, setSelectedMonth] = useState<string>(format(new Date(), 'yyyy-MM'));

  const soldProducts = products.filter(
    product => 
      product.status === 'sold' && 
      product.saleDate?.startsWith(selectedMonth)
  );

  const totalSales = soldProducts.reduce((sum, product) => sum + (product.salePrice || 0), 0);
  const totalProfit = soldProducts.reduce(
    (sum, product) => sum + ((product.salePrice || 0) - product.purchasePrice),
    0
  );

  return (
    <div className="pt-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">Ventes</h1>

      <div className="mb-6">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full bg-gray-800 rounded-lg p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total des ventes:</h3>
          <p className="text-2xl font-bold">{totalSales}€</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Bénéfice total:</h3>
          <p className="text-2xl font-bold">{totalProfit}€</p>
        </div>
      </div>

      <div className="space-y-4">
        {soldProducts.map(product => (
          <div key={product.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex gap-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-400">
                    Prix d'achat: <span className="text-white">{product.purchasePrice}€</span>
                  </p>
                  <p className="text-gray-400">
                    Prix de vente: <span className="text-white">{product.salePrice}€</span>
                  </p>
                  <p className="text-gray-400">
                    Bénéfice: <span className="text-green-500">
                      {(product.salePrice || 0) - product.purchasePrice}€
                    </span>
                  </p>
                  <p className="text-gray-400">
                    Date de vente: <span className="text-white">
                      {product.saleDate && format(new Date(product.saleDate), 'dd/MM/yyyy', { locale: fr })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sales;