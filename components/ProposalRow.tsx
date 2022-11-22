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


const ProposalDetails = (props: {
  detailName: String;
  detailValue: String;
}) => {
  return (
    <Box
      display="flex"
      alignItems="flex-start"
      justifyContent="space-between"
      textAlign="left"
      p={2}
    >
      <Heading flex="1" size="xs">
        {props.detailName}
      </Heading>
      <Text flex="2" fontSize="xs">
        {props.detailValue.toString()}
      </Text>
    </Box>
  );
};

const ProposalRow = (props: Proposal) => {
  const [isShown, setIsShown] = useState(false);

  const date = new Date(props?.dateProposal?.toString()).toDateString();
  const proposalDetails = [
    { name: "id", value: props?.id },
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

  const goToProposal = (props: Proposal) => {
          router.push({
            pathname: `/updateDraft`
          })
    }

  return (
    <Box p="20px">
      <Accordion allowToggle>
        <AccordionItem>
          {/* THE HEADER */}
          <h2>
            <AccordionButton _expanded={{ bg: "#DDEAF7" }}>
              <Box flex="1" textAlign="left">
                <Heading size="md">{props.name}</Heading>
                <Text fontSize="xs">by {props.author}</Text>
                <Text>{props.summary}</Text>
              </Box>
              <AccordionIcon />

              <IconButton
                fontSize="20px"
                onClick={() => goToProposal()}
                aria-label="Search database"
                icon={<EditIcon />}
                style={{ marginLeft: "1rem" }}
                colorScheme="blue"
                id={props.id}
              />

              {isShown && (		
                <div>Edit the proposal</div>		
              )}
            </AccordionButton>
          </h2>
          {/* THE DETAILS */}
          <AccordionPanel pb={4}>
            {proposalDetails.map((each,i) => (
              <ProposalDetails
                key={each.value}
                detailName={each.name}
                detailValue={each.value}
              />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
    
  );
};

export default ProposalRow;

/* For the BIPT - 31
1. Make the icon clickable - DONE
2. Create a dynamic proposal page like the draft page 
3. Use the usestate code to take the draft to the dynamic proposal page
4. populate the proposal page with the data
*/
