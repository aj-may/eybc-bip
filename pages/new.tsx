import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import NavBar from 'components/Navbar'

import {
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
      <NavBar />

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

        <Heading>New Proposal</Heading>

        <ProposalForm />
      </VStack>
    </Layout>
  );
};

export default Page;
