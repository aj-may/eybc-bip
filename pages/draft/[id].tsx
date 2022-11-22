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
import ProposalRow from "components/ProposalRow";
import { useRouter } from "next/router";

/*export async function getStaticProps({ params }) {
  return {
    props: {
      draftId:params.id,
    },
  };
}*/


const Page: NextPage = (props) => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const { drafts } = useDrafts();
  console.log(drafts);

  const router = useRouter()
  const id = router.query;
  console.log(id); 

  console.log(drafts);

  const result = drafts.filter(obj => {
    if(obj.id===id) {
    return obj
  })

  console.log(result);

  return (
         <ProposalForm />
  );
};

export default Page;