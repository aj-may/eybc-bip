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
import { useCreateProposal } from "lib/useProposals";
import { Proposal } from "@prisma/client";
import { PracticeLeaders } from "fixtures/practiceleaders";

const ProposalForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Proposal>();
  const { createProposal, isLoading } = useCreateProposal();
  const onSubmit = (proposal: Proposal) => {
    createProposal(proposal, { onSuccess: () => router.push("/") });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={6}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>BIP-#</FormLabel>
          <InputGroup>
            <InputLeftAddon>BIP-#:</InputLeftAddon>
            <Input {...register("id", { required: true })} autoComplete="off" />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Title of BIP:</FormLabel>
          <Input {...register("name")} autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Co-Authors:</FormLabel>
          <FormHelperText>Enter full names of all co-authors.</FormHelperText>
          <Input {...register("coAuthors")} autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Date Proposed:</FormLabel>
          <Input
            {...register("dateProposal")}
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
          <Input {...register("championshipTeam")} autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Leadership Sponsor:</FormLabel>
          <PracticeLeaders />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Simple Summary/Abstract:</FormLabel>
          <FormHelperText>
            Provide one to two sentences that describe the proposal at a high
            level.
          </FormHelperText>
          <Textarea minH="10rem" {...register("summary")} />
        </FormControl>

        <FormControl>
          <FormLabel>Motivation(s):</FormLabel>
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
          <Textarea {...register("motivation")} />
        </FormControl>

        <FormControl>
          <FormLabel>Specifications</FormLabel>
          <FormHelperText>
            Enter detailed description of the proposal. Feel free to add
            rationale explaining why certain design choices were made in the
            specification.
          </FormHelperText>
          <Textarea {...register("specifications")} />
        </FormControl>

        <FormControl>
          <FormLabel>Risks/Impediments</FormLabel>
          <FormHelperText>
            Document any potential risks that will slow or block this effort.
          </FormHelperText>
          <Textarea {...register("risks")} />
        </FormControl>

        <FormControl>
          <FormLabel>Success Metrics</FormLabel>
          <FormHelperText>
            Enter metrics that will be used to measure the success of the
            proposal once accepted and actioned upon.
          </FormHelperText>
          <Textarea {...register("successMetrics")} />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input {...register("status")} />
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

export default ProposalForm;
