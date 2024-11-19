import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useConsignmentStore } from '../stores/consignmentStore';
import AddConsignmentModal from '../components/AddConsignmentModal';

function Consignment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const consignments = useConsignmentStore(state => state.consignments);

  const filteredConsignments = consignments.filter(consignment =>
    consignment.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-6 pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Consignation</h1>
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

        <div className="space-y-4">
          {filteredConsignments.map(consignment => (
            <div key={consignment.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex gap-4">
                <img
                  src={consignment.imageUrl}
                  alt={consignment.itemName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{consignment.itemName}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p className="text-gray-400">
                      Prix demandé: <span className="text-white">{consignment.askingPrice}€</span>
                    </p>
                    <p className="text-gray-400">
                      Commission: <span className="text-white">{consignment.commission}%</span>
                    </p>
                    <p className="text-gray-400">
                      Client: <span className="text-white">{consignment.clientName}</span>
                    </p>
                    <p className="text-gray-400">
                      État: <span className={`${
                        consignment.status === 'sold' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {consignment.status === 'sold' ? 'Vendu' : 'En consigne'}
                      </span>
                    </p>
                  </div>
                  {consignment.status !== 'sold' && (
                    <button
                      onClick={() => useConsignmentStore.getState().markAsSold(consignment.id)}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                    >
                      Marquer comme vendu
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddConsignmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Consignment;