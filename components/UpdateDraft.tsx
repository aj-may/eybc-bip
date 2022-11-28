import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Textarea,
  VStack,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useLeadershipSponsor } from "lib/useLeadershipSponsor";
import { Proposal } from "@prisma/client";
import { useUpdateDraft } from "lib/useDrafts";
import { useEffect, useState } from "react";
import draft from "pages/draft";

const UpdateDraft = (props: any) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Proposal>({ mode: "onSubmit" });

  const { updateDraft, isLoading } = useUpdateDraft();

  const onSubmit = (proposal: Proposal) => {
    updateDraft(proposal, { onSuccess: () => router.push("/") });
  };

  const { leadershipSponsors } = useLeadershipSponsor();

  let selectOptions: JSX.Element[] = [];
  if (leadershipSponsors) {
    selectOptions = leadershipSponsors?.map((val) => (
      <option value={val.name} key={val.id}>
        {val.name}
      </option>
    ));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel {...props.id} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Title of BIP:</FormLabel>
          <Input defaultValue={props.name} />
        </FormControl>

        <FormControl>
          <FormLabel>Co-Authors:</FormLabel>
          <FormHelperText>Enter full names of all co-authors.</FormHelperText>
          <Input defaultValue={props.coAuthors} />
        </FormControl>

        <FormControl>
          <FormLabel>Date Proposed:</FormLabel>
          <Input
            defaultValue={props.dateProposal}
            placeholder="Select Proposal Submission Date"
            type="date"
            autoComplete="off"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Championship Team:</FormLabel>
          <FormHelperText>
            Enter full names of volunteers supporting.
          </FormHelperText>
          <Input defaultValue={props.championshipTeam} autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Leadership Sponsor:</FormLabel>
          <Select
            placeholder="Select option"
            defaultValue={props.leadershipSponsor}
          >
            {selectOptions}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Simple Summary/Abstract:</FormLabel>
          <FormHelperText>
            Provide one to two sentences that describe the proposal at a high
            level.
          </FormHelperText>
          <Textarea minH="10rem" defaultValue={props.summary} />
        </FormControl>

        <FormControl>
          <FormLabel>Motivation(s):</FormLabel>
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
          <Textarea defaultValue={props.motivation} />
        </FormControl>

        <FormControl>
          <FormLabel>Specifications</FormLabel>
          <FormHelperText>
            Enter detailed description of the proposal. Feel free to add
            rationale explaining why certain design choices were made in the
            specification.
          </FormHelperText>
          <Textarea defaultValue={props.specifications} />
        </FormControl>

        <FormControl>
          <FormLabel>Risks/Impediments</FormLabel>
          <FormHelperText>
            Document any potential risks that will slow or block this effort.
          </FormHelperText>
          <Textarea defaultValue={props.risks} />
        </FormControl>

        <FormControl>
          <FormLabel>Success Metrics</FormLabel>
          <FormHelperText>
            Enter metrics that will be used to measure the success of the
            proposal once accepted and actioned upon.
          </FormHelperText>
          <Textarea defaultValue={props.successMetrics} />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input defaultValue={props.status} />
        </FormControl>

        <Flex gap={3}>
          <Spacer />
          <Link href="/" passHref>
            <Button>Cancel</Button>
          </Link>
          <Button colorScheme="blue" isLoading={isLoading} type="submit">
            Save
          </Button>
          <Link href="#" passHref>
            <Button colorScheme="blue">Submit for RFC</Button>
          </Link>
        </Flex>
      </VStack>
    </form>
  );
};

export default UpdateDraft;
