import { MongoClient } from "mongodb";

// const uri = require('dotenv').config({ path: `.env.local.${process.env.NODE_ENV}` });
const uri = "DATABASE_URL"
const client = new MongoClient(uri)

export const updateProposals = async () => {
  try{
    const db = client.db("bip").collection("Proposal")
    const result = await db.updateMany({ leadershipSponsor: null }, [
      {
        $set: {
          dateProposal: "2022-10-19T00:00:00.000Z",
          championshipTeam: "update",
          leadershipSponsor: "update",
        },
      },
      { $unset: "timeline" }
    ]);
    console.log(result) // TODO: understand why the console log isn't showing
  } finally {
    await client.close();
  }
};

updateProposals().catch(console.dir);
