import { PrismaClient } from "@prisma/client";
import { withAuth } from "lib/auth";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const proposals = await prisma.proposal.findMany();
        return res.json(proposals);
      } catch (err) {
        return res.status(500).json({
          error: "Error getting proposals",
        });
      }

    case "POST":
      const {
        name,
        coAuthors,
        dateProposal,
        championshipTeam,
        leadershipSponsor,
        summary,
        motivation,
        specifications,
        risks,
        successMetrics,
        status,
        rfcStatus
      } = body;

      if (!name || !summary)
        return res.status(400).json({
          error: "Name and Summary are required fields",
        });

      const dateOfProposal = dateProposal? new Date(dateProposal) : new Date();

      const proposal = await prisma.proposal.create({
        data: {
          name,
          coAuthors,
          author: session.address as string,
          dateProposal: dateOfProposal,
          championshipTeam,
          leadershipSponsor,
          summary,
          motivation,
          specifications,
          risks,
          successMetrics,
          status,
          rfcStatus
        },
      });

      return res.json(proposal);

    default:
      if (!name || !summary)
        return res.status(405).json({
          error: "Method Not Allowed",
        });
  }
});
