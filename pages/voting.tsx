import type { NextPage } from "next";
import Layout from "components/Layout";
import { Flex, Spacer } from "@chakra-ui/react";
import ProposalButton from "components/NewProposalButton";
import useTokenGated from "lib/useTokenGated";
import Navbuttons from "components/Navbuttons";

const Voting: NextPage = () => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);

  return (
    <Layout>
      <Flex>
        <Navbuttons page="Voting" />
        <Spacer />
        <ProposalButton />
      </Flex>
    </Layout>
  );
};

export default Voting;
