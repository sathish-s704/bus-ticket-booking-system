import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Calendar as CalendarIcon, User, Lock } from 'lucide-react';

const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cardHolder: z.string()
    .min(3, 'Card holder name must be at least 3 characters'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([2-9]\d)$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string()
    .regex(/^\d{3}$/, 'CVV must be 3 digits'),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  amount: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentForm({ amount, onClose, onSuccess }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <div className="text-lg font-semibold text-indigo-600">₹{amount}</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                {...register('cardNumber')}
                type="text"
                placeholder="1234 5678 9012 3456"
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                maxLength={16}
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Holder Name
            </label>
            <div className="relative">
              <input
                {...register('cardHolder')}
                type="text"
                placeholder="JOHN DOE"
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.cardHolder && (
              <p className="text-red-500 text-xs mt-1">{errors.cardHolder.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <div className="relative">
                <input
                  {...register('expiryDate')}
                  type="text"
                  placeholder="MM/YY"
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  maxLength={5}
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.expiryDate && (
                <p className="text-red-500 text-xs mt-1">{errors.expiryDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <div className="relative">
                <input
                  {...register('cvv')}
                  type="password"
                  placeholder="123"
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  maxLength={3}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.cvv && (
                <p className="text-red-500 text-xs mt-1">{errors.cvv.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}