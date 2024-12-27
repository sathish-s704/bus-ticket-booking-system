import React, { useEffect } from 'react';
import { useBusManagementStore } from '../../store/busManagementStore';
import { Bus, Pencil, Trash2, Plus } from 'lucide-react';
import { BusForm } from './BusForm';

export function BusManagement() {
  const { buses, isLoading, error, getBuses, deleteBus } = useBusManagementStore();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [editingBus, setEditingBus] = React.useState<string | null>(null);

  useEffect(() => {
    getBuses();
  }, [getBuses]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      await deleteBus(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Manage Buses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Bus
        </button>
      </div>

      <div className="grid gap-4">
        {buses.map((bus) => (
          <div
            key={bus.id}
            className="bg-white rounded-lg shadow p-6 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-indigo-100 rounded-full">
                <Bus className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium">{bus.name}</h3>
                <p className="text-sm text-gray-500">
                  {bus.from} → {bus.to} | {bus.departureTime} - {bus.arrivalTime}
                </p>
                <p className="text-sm text-gray-500">
                  Price: ₹{bus.price} | Available Seats: {
                    bus.availableSeats.ladies + 
                    bus.availableSeats.seniorCitizen + 
                    bus.availableSeats.general
                  }
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditingBus(bus.id)}
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(bus.id)}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showAddForm || editingBus) && (
        <BusForm
          bus={editingBus ? buses.find(b => b.id === editingBus) : undefined}
          onClose={() => {
            setShowAddForm(false);
            setEditingBus(null);
          }}
        />
      )}
    </div>
  );
}