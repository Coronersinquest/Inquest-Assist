import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetProgress, 
  useUpdateProgress as useApiUpdateProgress,
  useSubmitQuizAnswer as useApiSubmitQuizAnswer,
  getGetProgressQueryKey
} from "@workspace/api-client-react";

export function useProgress() {
  return useGetProgress();
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const mutation = useApiUpdateProgress();

  return {
    ...mutation,
    mutateAsync: async (params: { sectionId: string; completed: boolean; quizScore?: number }) => {
      const result = await mutation.mutateAsync({ data: params });
      // Invalidate the progress query so UI updates immediately
      queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
      return result;
    }
  };
}

export function useSubmitQuizAnswer() {
  const mutation = useApiSubmitQuizAnswer();
  
  return {
    ...mutation,
    mutateAsync: async (params: { questionId: string; answer: boolean }) => {
      return await mutation.mutateAsync({ data: params });
    }
  };
}
