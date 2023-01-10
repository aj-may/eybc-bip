import React, { useState } from "react";

import router, { useRouter } from "next/router";

import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";
import { Proposal } from "@prisma/client";
import ProposalDetails from "./ProposalDetails";

const ProposalRow = (props: Proposal) => {
  const [isShown, setIsShown] = useState(false);

  const date = new Date(props?.dateProposal?.toString()).toDateString();
  const proposalDetails = [
    { name: "Co-Authors", value: props?.coAuthors },
    { name: "Date Proposed", value: date },
    { name: "Championship Team", value: props?.championshipTeam },
    { name: "Leadership Sponsor", value: props?.leadershipSponsor },
    { name: "Simple Summary/ Abstract", value: props?.summary },
    { name: "Motivation(s)", value: props?.motivation },
    { name: "Specifications", value: props?.specifications },
    { name: "Risks/Impediments", value: props?.risks },
    { name: "Success Metrics", value: props?.successMetrics },
  ];

  const goToProposal = (id: string) => {
    router.push({
      pathname: `/updateDraft/${id}`,
    });
  };

//TODO: Fix listing of array elements in line 99 after prisma.schema update
  return (
    <Box p="20px">
      <Accordion allowToggle>
        <AccordionItem>
          {/* THE HEADER */}
          <h2>
            <AccordionButton _expanded={{ bg: "#DDEAF7" }}>
              <Box flex="1" textAlign="left">
                <Heading size="md">{props.name}</Heading>
                <Text fontSize="xs">by {props.coAuthors}</Text>
                <Text>{props.summary}</Text>
              </Box>
              <AccordionIcon />

              <IconButton
                fontSize="20px"
                onClick={() => goToProposal(props.id)}
                aria-label="Search database"
                icon={<EditIcon />}
                style={{ marginLeft: "1rem" }}
                colorScheme="blue"
                id={props.id}
              />

              {isShown && <div>Edit the proposal</div>}
            </AccordionButton>
          </h2>
          {/* THE DETAILS */}
          <AccordionPanel pb={4}>
            {proposalDetails.map((each, i) => (
              <ProposalDetails
                key={i}
                detailName={each.name}
                detailValue={"string"}
              />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ProposalRow;
