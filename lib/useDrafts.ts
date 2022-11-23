import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Proposal } from "@prisma/client";

export function useDrafts() {
  const { data: drafts, isLoading } = useQuery(["drafts"], async () => {
    const response = await axios.get<Proposal[]>("/api/drafts");
    return response.data;
  });
  return { drafts, isLoading };
}

export function useDraftsById(id: string) {
  const { data: drafts, isLoading } = useQuery(["drafts"], async () => {
    const response = await axios.get<Proposal>(`/api/drafts/${id}`);
    return response.data;
  });
  return drafts;
}

export function useUpdateDraft() {
  const queryClient = useQueryClient();
  const { mutate: updateDraft, isLoading } = useMutation(
    async (proposal: Proposal) => {
      const result = await axios.put("/api/proposals", proposal);
      return result.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["proposals"]);
      },
    }
  );

  return { updateDraft, isLoading };
}
