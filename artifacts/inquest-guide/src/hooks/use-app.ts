import { useQueryClient } from "@tanstack/react-query";
import {
  useGetProgress,
  useUpdateProgress as useApiUpdateProgress,
  getGetProgressQueryKey
} from "@workspace/api-client-react";

export function useProgress() {
  return useGetProgress({
    query: {
      retry: false,
      throwOnError: false,
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  const mutation = useApiUpdateProgress({
    mutation: {
      onError: () => {},
    },
  });

  const saveProgress = (params: { sectionId: string; completed: boolean; quizScore?: number }) => {
    mutation.mutate(
      { data: params },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProgressQueryKey() });
        },
        onError: () => {},
      },
    );
  };

  return { saveProgress, isPending: mutation.isPending };
}
