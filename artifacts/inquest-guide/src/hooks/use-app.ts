import { useQueryClient } from "@tanstack/react-query";
import {
  useGetProgress,
  useUpdateProgress as useApiUpdateProgress,
  getGetProgressQueryKey
} from "@workspace/api-client-react";
import { sections } from "@/lib/content";

const LS_KEY = "inquest-completed-sections";

function getLocalCompleted(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function markLocalCompleted(sectionId: string) {
  const current = getLocalCompleted();
  if (!current.includes(sectionId)) {
    localStorage.setItem(LS_KEY, JSON.stringify([...current, sectionId]));
  }
}

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
    if (params.completed) {
      markLocalCompleted(params.sectionId);
    }
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

export function useAllSectionsComplete(): boolean {
  const { data: progressData } = useProgress();

  const completedViaApi = sections.every(s =>
    progressData?.sections?.find(p => p.sectionId === s.id && p.completed)
  );

  if (completedViaApi) return true;

  const localCompleted = getLocalCompleted();
  return sections.every(s => localCompleted.includes(s.id));
}
