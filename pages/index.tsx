import type { NextPage } from "next";
import useTokenGated from "lib/useTokenGated";
import Layout from "components/Layout";
import Navigate from "components/Navigation";

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Spacer,
  VStack,
  Text,
  StackDivider,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useProposals } from "lib/useProposals";
import { Proposal } from "@prisma/client";

const ProposalRow = (props: Proposal) => (
  <Box p="20px">
    <Heading size="md">{props.name}</Heading>
    <Text fontSize="xs">by {props.author}</Text>
    <Text>{props.summary}</Text>
  </Box>
);

const Page: NextPage = () => {
  const badgeAddress = process.env.NEXT_PUBLIC_BADGE_ADDRESS || "";
  useTokenGated(badgeAddress, true);
  const { proposals } = useProposals();

  return (
    <Layout>
      <VStack align="stretch" spacing={5}>
        <Flex>
          <Navigate />
          <ButtonGroup isAttached>
            <Button isActive>All</Button>
            <Button>Draft</Button>
            <Button>RFC</Button>
            <Button>Accepted</Button>
          </ButtonGroup>

          <Spacer />

          <Link href="/new" passHref>
            <Button colorScheme="blue" leftIcon={<Icon as={FiPlus} />}>
              New Proposal
            </Button>
          </Link>
        </Flex>

        <VStack
          align="stretch"
          divider={<StackDivider />}
          borderWidth="1px"
          borderRadius="lg"
        >
          {proposals && proposals.length > 0 ? (
            proposals.map((p) => <ProposalRow key={p.id} {...p} />)
          ) : (
            <Box>No Proposals</Box>
          )}
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Page;
