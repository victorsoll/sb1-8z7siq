import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useProductStore } from '../stores/productStore';

const schema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  purchasePrice: z.number().min(0, 'Le prix doit être positif'),
  purchaseDate: z.string(),
  imageUrl: z.string().url('URL invalide'),
  category: z.enum(['sneakers', 'clothing', 'objects', 'tickets']),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const addProduct = useProductStore(state => state.addProduct);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    addProduct({
      ...data,
      id: crypto.randomUUID(),
      status: 'in_stock',
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Ajouter un article</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom</label>
            <input
              {...register('name')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix d'achat</label>
            <input
              type="number"
              {...register('purchasePrice', { valueAsNumber: true })}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.purchasePrice && (
              <p className="text-red-500 text-sm mt-1">{errors.purchasePrice.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date d'achat</label>
            <input
              type="date"
              {...register('purchaseDate')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL de l'image</label>
            <input
              {...register('imageUrl')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              {...register('category')}
              className="w-full bg-gray-700 rounded-lg p-2"
            >
              <option value="sneakers">Sneakers</option>
              <option value="clothing">Vêtements</option>
              <option value="objects">Objets</option>
              <option value="tickets">Billeterie</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register('description')}
              className="w-full bg-gray-700 rounded-lg p-2"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;