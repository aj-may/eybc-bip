import { PrismaClient } from "@prisma/client";
import { withAuth } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  // const draftsById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const { id } = query;
      try {
        const draftById = await prisma.proposal.findUnique({
          where: { id: `${id}` },
        });
        return res.json(draftById);
      } catch (err) {
        return res.status(500).json({
          error: "Proposal does not exist",
        });
      }

    default:
      return res.status(405).json({
        error: "Method Not Allowed",
      });
    
    case "PATCH":
      try {
        const updateDraft = await prisma.proposal.update({
          where: { id = `${id}` },
          data: {
            name,
            author: session.address as string,
            coAuthors,
            dateProposal: dateOfProposal,
            championshipTeam,
            leadershipSponsor,
            summary,
            motivation,
            specifications,
            risks,
            successMetrics
          },
        });
        return res.json(updateDraft);
      } catch (err) {
        return res.status(500).json({
          error: "Proposal does not exist",
        });
      }
  }
});
// };
// export default draftsById;
