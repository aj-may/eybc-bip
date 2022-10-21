import { PrismaClient, ProposalStatus } from "@prisma/client";
import { withAuth } from "lib/auth";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const drafts = await prisma.proposal.findMany({
          where: { status: "DRAFT" },
        });
        return res.json(drafts);
      } catch(err) {
        return res.status(500).json({
          error: "Failed to get proposals",
        });
      }

    default:
      return res.status(405).json({
        error: "Method Not Allowed",
      });
  }
});
