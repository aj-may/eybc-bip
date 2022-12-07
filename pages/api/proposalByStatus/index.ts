import { PrismaClient, ProposalStatus, RFCStatus } from "@prisma/client";
import { withAuth } from "lib/auth";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  const { method, query } = req;
  const { status, rfcStatus } = query;

  if (!status || !rfcStatus)
    return res.status(400).json({
      error: "status and rfcStatus are required to fetch proposals",
    });

  switch (method) {
    case "GET":
      try {
        const proposals = await prisma.proposal.findMany({
          where: {
            status: ProposalStatus[status as keyof typeof ProposalStatus],
            rfcStatus: RFCStatus[rfcStatus as keyof typeof RFCStatus],
          },
        });
        return res.json(proposals);
      } catch (err) {
        return res.status(500).json({
          error: `Failed to get proposals of status: ${status}`,
        });
      }

    default:
      return res.status(405).json({
        error: "Method Not Allowed",
      });
  }
});
