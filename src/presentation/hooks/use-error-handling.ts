import { useCallback } from 'react';
import { toast } from 'sonner';

export const useErrorHandling = () => {
  const handleError = useCallback((error: Error, context: string) => {
    console.error(`Error in ${context}:`, error);
    toast.error(`Error: ${error.message}`);
  }, []);

  return { handleError };
};