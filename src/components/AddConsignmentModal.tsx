import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useConsignmentStore } from '../stores/consignmentStore';

const schema = z.object({
  itemName: z.string().min(1, 'Le nom est requis'),
  askingPrice: z.number().min(0, 'Le prix doit être positif'),
  commission: z.number().min(0).max(100, 'La commission doit être entre 0 et 100'),
  clientName: z.string().min(1, 'Le nom du client est requis'),
  clientPhone: z.string().min(1, 'Le téléphone est requis'),
  imageUrl: z.string().url('URL invalide'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface AddConsignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddConsignmentModal({ isOpen, onClose }: AddConsignmentModalProps) {
  const addConsignment = useConsignmentStore(state => state.addConsignment);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      commission: 20, // Commission par défaut
    },
  });

  if (!isOpen) return null;

  const onSubmit = (data: FormData) => {
    addConsignment({
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Ajouter une consignation</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom de l'article</label>
            <input
              {...register('itemName')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.itemName && (
              <p className="text-red-500 text-sm mt-1">{errors.itemName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Prix demandé</label>
            <input
              type="number"
              {...register('askingPrice', { valueAsNumber: true })}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.askingPrice && (
              <p className="text-red-500 text-sm mt-1">{errors.askingPrice.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Commission (%)</label>
            <input
              type="number"
              {...register('commission', { valueAsNumber: true })}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.commission && (
              <p className="text-red-500 text-sm mt-1">{errors.commission.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nom du client</label>
            <input
              {...register('clientName')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm mt-1">{errors.clientName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Téléphone du client</label>
            <input
              {...register('clientPhone')}
              className="w-full bg-gray-700 rounded-lg p-2"
            />
            {errors.clientPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.clientPhone.message}</p>
            )}
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
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              {...register('notes')}
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

export default AddConsignmentModal;