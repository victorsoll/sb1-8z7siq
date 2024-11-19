import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useStatsStore } from '../stores/statsStore';

function Dashboard() {
  const stats = useStatsStore(state => state.stats);
  const months = ['Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', '2024'];

  return (
    <div className="pt-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">DASHBOARD</h1>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {months.map(month => (
          <button
            key={month}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              month === '2024' ? 'bg-red-500' : 'bg-gray-800'
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Bénéfice:</h3>
          <p className="text-2xl font-bold">{stats.profit}€</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total achats:</h3>
          <p className="text-2xl font-bold">{stats.totalPurchases}€</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Total ventes (CA):</h3>
          <p className="text-2xl font-bold">{stats.revenue}€</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-2">Marge moyenne:</h3>
          <p className="text-2xl font-bold">{stats.averageMargin}%</p>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Objectif ({stats.target}€):</h3>
          <div className="h-2 bg-gray-700 rounded-full mt-2">
            <div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${(stats.profit / stats.target) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Détails:</h3>
        {[
          { label: 'Gains:', value: stats.gains },
          { label: 'Dépenses:', value: stats.expenses },
          { label: 'Bénéfice sneakers:', value: stats.sneakersProfit },
          { label: 'Bénéfice objets:', value: stats.objectsProfit },
          { label: 'Bénéfice vêtements:', value: stats.clothingProfit },
          { label: 'Bénéfice billeterie:', value: stats.ticketsProfit },
          { label: 'Total salaire:', value: stats.totalSalary },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="text-gray-400">{label}</span>
            <span>{value}€</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;