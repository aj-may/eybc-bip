import type { NextPage } from "next";
import Layout from "components/Layout";
import { Box, Flex, Spacer, StackDivider, VStack } from "@chakra-ui/react";
import ProposalButton from "components/NewProposalButton";
import useTokenGated from "lib/useTokenGated";
import Navbuttons from "components/Navbuttons";
import { useProposalsByStatus } from "lib/useProposalsByStatus";
import ProposalRow from "components/ProposalRow";

const RFC: NextPage = () => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const { proposals: rfcProposals } = useProposalsByStatus({
    status: "RFC",
    rfcStatus: "UNPUBLISHED",
  });

  return (
    <Layout>
      <VStack align="stretch" spacing={5}>
        <Flex>
          <Navbuttons page="RFC" />
          <Spacer />
          <ProposalButton />
        </Flex>
        <VStack
          align="stretch"
          divider={<StackDivider />}
          borderWidth="1px"
          borderRadius="lg"
        >
          {rfcProposals && rfcProposals.length > 0 ? (
            rfcProposals.map((p) => <ProposalRow key={p.id} {...p} />)
          ) : (
            <Box>No RFC PROPOSALS</Box>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default RFC;
