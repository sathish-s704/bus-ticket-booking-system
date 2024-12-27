import React from 'react';
import { Star, User, Calendar } from 'lucide-react';

export function RecentFeedbacks() {
  const recentFeedbacks = [
    {
      id: 'FB001',
      userName: 'Praveen',
      rating: 5,
      comment: 'Excellent service! The bus was clean and comfortable.',
      date: '2024-03-19',
    },
    {
      id: 'FB002',
      userName: 'Sathish',
      rating: 4,
      comment: 'Good experience overall. Slight delay in departure.',
      date: '2024-03-18',
    },
    {
      id: 'FB003',
      userName: 'Ganesh',
      rating: 5,
      comment: 'Very professional staff and punctual service.',
      date: '2024-03-17',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
      <div className="space-y-4">
        {recentFeedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <span className="font-medium">{feedback.userName}</span>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < feedback.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{feedback.comment}</p>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {feedback.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}