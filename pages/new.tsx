import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import Navbuttons from "components/Navbuttons";

import {
  Alert,
  AlertIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import ProposalForm from "components/proposalForm";

const Page: NextPage = () => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);

  return (
    <Layout>
      <Navbuttons />

      <VStack spacing="6" align="stretch">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href="/" passHref>
              <BreadcrumbLink>Proposals</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Link href="/new" passHref>
              <BreadcrumbLink>New Proposal</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Alert status="info">
          <AlertIcon />
          All fields must be filled out in order to submit for RFC (Request For
          Comments).
        </Alert>
        <Heading>New Proposal</Heading>

        <ProposalForm />
      </VStack>
    </Layout>
  );
};

export default Page;
