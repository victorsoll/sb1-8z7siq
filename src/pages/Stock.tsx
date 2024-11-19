import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import ProductList from '../components/ProductList';
import AddProductModal from '../components/AddProductModal';
import { useProductStore } from '../stores/productStore';

function Stock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const products = useProductStore(state => state.products);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Tout' },
    { id: 'sneakers', label: 'Sneakers' },
    { id: 'clothing', label: 'Vêtements' },
    { id: 'objects', label: 'Objets' },
    { id: 'tickets', label: 'Billeterie' },
  ];

  return (
    <div className="pt-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 p-2 rounded-full"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.id ? 'bg-red-500' : 'bg-gray-800'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <ProductList products={filteredProducts} />
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Stock;