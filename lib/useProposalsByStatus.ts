import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Proposal, RFCStatus, ProposalStatus } from "@prisma/client";

type StatusCriteria = {
  status: ProposalStatus;
  rfcStatus: RFCStatus;
};

export function useProposalsByStatus(statusObject: StatusCriteria) {
  const { data: proposals, isLoading } = useQuery(
    ["proposalByStatusKey"],
    async () => {
      const response = await axios.get<Proposal[]>(
        `/api/proposalByStatus?status=${statusObject.status}&rfcStatus=${statusObject.rfcStatus}`
      );
      return response.data;
    }
  );
  return { proposals, isLoading };
}
