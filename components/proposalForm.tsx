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

        <FormControl isRequired>
          <FormLabel>Title of BIP:</FormLabel>
          <Input {...register("name", { required: true })} autoComplete="off" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Co-Authors:</FormLabel>
          <FormHelperText>Enter full names of all co-authors.</FormHelperText>
          <Input
            {...register("coAuthors", { required: true })}
            autoComplete="off"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Date Proposed:</FormLabel>
          <Input
            {...register("dateProposal", { required: true })}
            placeholder="Select Proposal Submission Date"
            type="date"
            autoComplete="off"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Ratified:</FormLabel>
          <Input
            {...register("dateRatified")}
            placeholder="Select Proposal Ratification Date"
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

        <FormControl isRequired>
          <FormLabel>Leadership Sponsor:</FormLabel>
          <Select
            placeholder="Select Leadership Sponsor"
            {...register("leadershipSponsor", { required: true })}
          >
            <option value="option1">Chen Zur</option>
            <option value="option2">James Canterbury</option>
            <option value="option3">Rajat Kapur</option>
            <option value="option4">Arwin Holmes</option>
            <option value="option5">AJ May</option>
            <option value="option6">Graham Cathcart</option>
            <option value="option7">Brian Stern</option>
            <option value="option8">Tom Garlick</option>
            <option value="option9">Dale Bocra</option>
            <option value="option10">Kartheek Solipuram</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Simple Summary/Abstract:</FormLabel>
          <FormHelperText>
            Provide one to two sentences that describe the proposal at a high
            level.
          </FormHelperText>
          <Textarea minH="10rem" {...register("summary", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Motivation(s):</FormLabel>
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
          <Textarea {...register("motivation", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Specifications</FormLabel>
          <FormHelperText>
            Enter detailed description of the proposal. Feel free to add
            rationale explaining why certain design choices were made in the
            specification.
          </FormHelperText>
          <Textarea {...register("specifications", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Risks/Impediments</FormLabel>
          <FormHelperText>
            Document any potential risks that will slow or block this effort.
          </FormHelperText>
          <Textarea {...register("risks", { required: true })} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Success Metrics</FormLabel>
          <FormHelperText>
            Enter metrics that will be used to measure the success of the
            proposal once accepted and actioned upon.
          </FormHelperText>
          <Textarea {...register("successMetrics", { required: true })} />
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
          <Button colorScheme="blue">
            Submit for RFC
          </Button>
          </Link>
        </Flex>
      </VStack>
    </form>
  );
};

export default ProposalForm;
