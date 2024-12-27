import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Bus } from '../../types';
import { tamilNaduCities } from '../../data/cities';
import { useBusManagementStore } from '../../store/busManagementStore';

const busSchema = z.object({
  name: z.string().min(3, 'Bus name must be at least 3 characters'),
  from: z.enum([...tamilNaduCities] as [string, ...string[]]),
  to: z.enum([...tamilNaduCities] as [string, ...string[]]),
  departureTime: z.string(),
  arrivalTime: z.string(),
  price: z.number().min(1, 'Price must be greater than 0'),
  totalSeats: z.number().min(1, 'Total seats must be greater than 0'),
  availableSeats: z.object({
    ladies: z.number().min(0),
    seniorCitizen: z.number().min(0),
    general: z.number().min(0),
  }),
});

type BusFormData = z.infer<typeof busSchema>;

interface BusFormProps {
  bus?: Bus;
  onClose: () => void;
}

export function BusForm({ bus, onClose }: BusFormProps) {
  const { addBus, updateBus, isLoading } = useBusManagementStore();
  
  const { register, handleSubmit, formState: { errors } } = useForm<BusFormData>({
    resolver: zodResolver(busSchema),
    defaultValues: bus || {
      availableSeats: {
        ladies: 0,
        seniorCitizen: 0,
        general: 0,
      },
    },
  });

  const onSubmit = async (data: BusFormData) => {
    try {
      if (bus) {
        await updateBus(bus.id, data);
      } else {
        await addBus(data);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save bus:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {bus ? 'Edit Bus' : 'Add New Bus'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bus Name
              </label>
              <input
                {...register('name')}
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                From
              </label>
              <select
                {...register('from')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select city</option>
                {tamilNaduCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.from && (
                <p className="text-red-500 text-xs mt-1">{errors.from.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                To
              </label>
              <select
                {...register('to')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select city</option>
                {tamilNaduCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.to && (
                <p className="text-red-500 text-xs mt-1">{errors.to.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (₹)
              </label>
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.price && (
                <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Time
              </label>
              <input
                {...register('departureTime')}
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.departureTime && (
                <p className="text-red-500 text-xs mt-1">{errors.departureTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Arrival Time
              </label>
              <input
                {...register('arrivalTime')}
                type="time"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.arrivalTime && (
                <p className="text-red-500 text-xs mt-1">{errors.arrivalTime.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Seats
              </label>
              <input
                {...register('totalSeats', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.totalSeats && (
                <p className="text-red-500 text-xs mt-1">{errors.totalSeats.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ladies Seats
              </label>
              <input
                {...register('availableSeats.ladies', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senior Citizen Seats
              </label>
              <input
                {...register('availableSeats.seniorCitizen', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                General Seats
              </label>
              <input
                {...register('availableSeats.general', { valueAsNumber: true })}
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : bus ? 'Update Bus' : 'Add Bus'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}