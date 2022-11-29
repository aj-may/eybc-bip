import { PrismaClient } from "@prisma/client";
import { withAuth } from "lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//export default withAuth(async (req, res, session) => {
const draftsById = async (req: NextApiRequest, res: NextApiResponse) => {
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

      case "PATCH":
        const { name, coAuthors, date, championshipTeam, leadershipSponsor, summary, motivation, specifications, risks, successMetrics } = query;
        console.log(query);
        try {
          const draftById = await prisma.proposal.update({
            where: { id: `${id}` },
            data: {
              name: `${name}`,
              coAuthors: `${coAuthors}`,
              //date: `${date}`,
              championshipTeam: `${championshipTeam}`,
              leadershipSponsor: `${leadershipSponsor}`,
              summary: `${summary}`,
              motivation: `${motivation}`,
              specifications: `${specifications}`,
              risks: `${risks}`,
              successMetrics: `${successMetrics}`
            },
          });
          console.log(draftsById);
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
      }
      
    // });
};
export default draftsById;
