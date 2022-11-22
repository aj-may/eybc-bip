import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import Navbuttons from 'components/Navbuttons'
import { useDrafts } from "lib/useDrafts";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import ProposalForm from "components/proposalForm";
import { Proposal } from "@prisma/client";

const Page: NextPage = (props: Proposal) => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const { drafts } = useDrafts();
  console.log(drafts);

  return (
    <Layout>
      <Navbuttons />

        <ProposalForm id={props.id}/>

    </Layout>
  );
};

export default Page;