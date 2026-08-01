import api from '@/utils/axios';
import { AISummaryResponse } from '@/features/ai/types/ai';

export const aiService = {
  getSummary: async (): Promise<AISummaryResponse> => {
    const response = await api.get<AISummaryResponse>('/api/ai/summary');
    return response.data;
  },
};
