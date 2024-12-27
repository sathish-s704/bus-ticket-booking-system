import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search } from 'lucide-react';
import { tamilNaduCities, TamilNaduCity } from '../../data/cities';
import { useBusStore } from '../../store/busStore';
import { BusSearchResults } from './BusSearchResults';

const searchSchema = z.object({
  from: z.enum([...tamilNaduCities] as [string, ...string[]]),
  to: z.enum([...tamilNaduCities] as [string, ...string[]]),
  date: z.string().min(1, 'Date is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

export function BusSearch() {
  const { searchBuses, isLoading } = useBusStore();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    await searchBuses(data.from as TamilNaduCity, data.to as TamilNaduCity, data.date);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6">Search Buses</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select
                {...register('from')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select city</option>
                {tamilNaduCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from.message}</p>}
            </div>
            
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select
                {...register('to')}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select city</option>
                {tamilNaduCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to.message}</p>}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                {...register('date')}
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Search Buses'}
            </button>
          </div>
        </form>
      </div>
      <BusSearchResults />
    </>
  );
}