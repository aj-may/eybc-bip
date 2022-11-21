import React, { useState } from 'react';

import { Box, Heading, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'

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
      { name :"Co-Authors", value: props?.coAuthors },
      { name :"Date Proposed", value: date},
      { name :"Championship Team", value: props?.championshipTeam },
      { name :"Leadership Sponsor", value: props?.leadershipSponsor },
      { name :"Simple Summary/ Abstract", value: props?.summary },
      { name :"Motivation(s)", value: props?.motivation },
      { name :"Specifications", value: props?.specifications },
      { name :"Risks/Impediments", value: props?.risks },
      { name :"Success Metrics", value: props?.successMetrics },
    ];



  return (
    <Box p="20px">
      <Accordion allowToggle>
        <AccordionItem>
          {/* THE HEADER */}
          <h2>
            <AccordionButton _expanded={{ bg: '#DDEAF7' }}>
              <Box flex="1" textAlign="left">
                <Heading size="md">{props.name}</Heading>
                <Text fontSize="xs">by {props.author}</Text>
                <Text>{props.summary}</Text>
              </Box>
              <AccordionIcon />
              <Popover>
                <PopoverTrigger>
                  <EditIcon  onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)} /> 
                </PopoverTrigger>
                <PopoverContent>
                {isShown && (
                  <PopoverBody>Edit the proposal</PopoverBody>
                )}
                </PopoverContent>

              </Popover>

            </AccordionButton >
          </h2>
          {/* THE DETAILS */}
          <AccordionPanel pb={4} >
            {proposalDetails.map((each, i) => (
              <ProposalDetails key={each.value} detailName={each.name} detailValue={each.value}/>
            ))}

          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default ProposalRow;
