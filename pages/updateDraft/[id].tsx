import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import Navbuttons from "components/Navbuttons";
import { useDraftsById } from "lib/useDrafts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import UpdateDraft from "components/UpdateDraft";
import { Proposal } from "@prisma/client";
import ProposalRow from "components/ProposalRow";
import { useRouter } from "next/router";

const Page: NextPage = (props) => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);

  const router = useRouter();
  const idObject = router.query;

  const id = idObject.id;

  const draft = useDraftsById(id as string);

  return (
    <Layout>
      <UpdateDraft
        id={draft?.id}
        name={draft?.name}
        coAuthors={draft?.coAuthors}
        dateProposal={draft?.dateProposal}
        championshipTeam={draft?.championshipTeam}
        leadershipSponsor={draft?.leadershipSponsor}
        summary={draft?.summary}
        motivation={draft?.motivation}
        specifications={draft?.specifications}
        risks={draft?.risks}
        successMetrics={draft?.successMetrics}
        status={draft?.status}
      />
    </Layout>
  );
};

export default Page;
