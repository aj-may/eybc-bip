import { PrismaClient } from "@prisma/client";
import { withAuth } from "lib/auth";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      const proposals = await prisma.proposal.findMany();
      return res.json(proposals);

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
      } = body;

      if (!name || !summary)
        return res.status(400).json({
          error: "Name and Summary are required fields",
        });

      const proposal = await prisma.proposal.create({
        data: {
          name,
          author: session.address as string,
          coAuthors,
          dateProposal,
          championshipTeam,
          leadershipSponsor,
          summary,
          motivation,
          specifications,
          risks,
          successMetrics,
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
