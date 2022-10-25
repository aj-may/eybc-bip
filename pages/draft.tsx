import type { NextPage } from "next";
import Navbuttons from "components/Navbuttons";
import Layout from "components/Layout";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Proposal } from "@prisma/client";
import { useDrafts } from "lib/useDrafts";
import useTokenGated from "lib/useTokenGated";
import ProposalButton from "components/NewProposalButton";

const ProposalRow = (props: Proposal) => (
  <Box p="20px">
    <Heading size="md">{props.name}</Heading>
    <Text fontSize="xs">by {props.author}</Text>
    <Text>{props.summary}</Text>
  </Box>
);

const Draft: NextPage = () => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const { drafts } = useDrafts();

  return (
    <Layout>
      <VStack align="stretch" spacing={5}>
        <Flex>
          <Navbuttons page="Drafts" />
          <Spacer />
          <ProposalButton />
        </Flex>
        <VStack
          align="stretch"
          divider={<StackDivider />}
          borderWidth="1px"
          borderRadius="lg"
        >
          {drafts && drafts.length > 0 ? (
            drafts.map((p) => <ProposalRow key={p.id} {...p} />)
          ) : (
            <Box>No Proposals</Box>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Draft;
