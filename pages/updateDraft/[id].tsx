import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import { useDraftsById } from "lib/useDrafts";
import UpdateDraft from "components/UpdateDraft";
import { useRouter } from "next/router";
import { ProposalStatus } from "@prisma/client";

const Page: NextPage = (props) => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const router = useRouter();
  const idObject = router.query;

  const id = idObject.id;

  const draft = useDraftsById(id as string);

  const draftId = draft?.id as string;
  const name = draft?.name as string;
  const coAuthors = draft?.coAuthors as string;
  const dateProposal = draft?.dateProposal as Date;
  const championshipTeam = draft?.championshipTeam as string;
  const leadershipSponsor = draft?.leadershipSponsor as string;
  const summary = draft?.summary as string;
  const motivation = draft?.motivation as string;
  const specifications = draft?.specifications as string;
  const risks = draft?.risks as string;
  const successMetrics = draft?.successMetrics as string;
  const status = draft?.status as ProposalStatus;

  return (
    <Layout>
      <UpdateDraft
        author={""}
        id={draftId}
        name={name}
        coAuthors={coAuthors}
        dateProposal={dateProposal}
        championshipTeam={championshipTeam}
        leadershipSponsor={leadershipSponsor}
        summary={summary}
        motivation={motivation}
        specifications={specifications}
        risks={risks}
        successMetrics={successMetrics}
        status={status}
      />
    </Layout>
  );
};

export default Page;
