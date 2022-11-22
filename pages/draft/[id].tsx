import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import Navbuttons from 'components/Navbuttons'
import { useDraftsById } from "lib/useDrafts";

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
import ProposalRow from "components/ProposalRow";
import { useRouter } from "next/router";


const Page: NextPage = (props) => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);

  const router = useRouter()
  const idObject = router.query;
  console.log(idObject); 

  const id = idObject.id;
  console.log(id);

  const draft  = useDraftsById(id);
  console.log(draft);

  return (
        <Layout>
         <ProposalForm />
         </Layout>
  );
};

export default Page;