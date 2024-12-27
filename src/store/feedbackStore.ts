import { create } from 'zustand';
import { Feedback } from '../types';

interface FeedbackState {
  feedbacks: Feedback[];
  isLoading: boolean;
  error: string | null;
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbacks: [],
  isLoading: false,
  error: null,
  submitFeedback: async (feedbackData) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFeedback: Feedback = {
        ...feedbackData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      };
      
      set(state => ({
        feedbacks: [...state.feedbacks, newFeedback],
        isLoading: false,
      }));
    } catch (error) {
      set({ 
        error: 'Failed to submit feedback. Please try again later.',
        isLoading: false,
      });
    }
  },
}));