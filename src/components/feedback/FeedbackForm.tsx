import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, Send } from 'lucide-react';
import { useFeedbackStore } from '../../store/feedbackStore';
import { useNavigate } from 'react-router-dom';

const feedbackSchema = z.object({
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters').max(500),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  bookingId: string;
  userId: string;
}

export function FeedbackForm({ bookingId, userId }: FeedbackFormProps) {
  const navigate = useNavigate();
  const { submitFeedback, isLoading } = useFeedbackStore();
  const [selectedRating, setSelectedRating] = React.useState<number>(0);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: '',
    },
  });

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      await submitFeedback({
        userId,
        bookingId,
        rating: data.rating,
        comment: data.comment,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setValue('rating', rating); // Set the rating value in react-hook-form
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Share Your Experience</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating)}
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  selectedRating >= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Comments
          </label>
          <textarea
            {...register('comment')}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Tell us about your experience..."
          />
          {errors.comment && (
            <p className="text-red-500 text-xs mt-1">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}
