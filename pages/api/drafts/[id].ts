import { PrismaClient } from "@prisma/client";
import { withAuth } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default withAuth(async (req, res, session) => {
  const { method, query, body } = req;

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

    case "PATCH":
      const draftId = query.id;
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
      const dateOfProposal = dateProposal ? new Date(dateProposal) : new Date();

      try {
        const draftById = await prisma.proposal.update({
          where: { id: `${draftId}` },
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
          },
        });
        return res.json(draftById);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: "Proposal does not exist",
        });
      }

    default:
      return res.status(405).json({
        error: "Method Not Allowed",
      });
  }
});
