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
          <FormLabel>Proposal Name</FormLabel>
          <InputGroup>
            <InputLeftAddon>BIP-#:</InputLeftAddon>
            <Input
              {...register("name", { required: true })}
              autoComplete="off"
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Co-Authors</FormLabel>
          <Input {...register("coAuthors")} autoComplete="off" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Summary</FormLabel>
          <Textarea {...register("summary", { required: true })} />
          <FormHelperText>
            One to two sentances that describe the proposal at a high level.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Motivation</FormLabel>
          <Textarea minH="10rem" {...register("motivation")} />
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Specifications</FormLabel>
          <Textarea minH="10rem" {...register("specifications")} />
          <FormHelperText>
            Detailed description of the proposal. Feel free to add rationale
            explaining why certain design choices were made in the
            specification.
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Timeline</FormLabel>
          <Textarea {...register("timeline")} />
          <FormHelperText>
            Proposed Timeline and/or Defined Stages to accomplish the proposal
            (Keep high level! We aren&apos;t expecting a full project plan here)
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Risks/Impediments</FormLabel>
          <Textarea {...register("risks")} />
          <FormHelperText>
            Document any potential risks that will slow or block this effort
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Success Metrics</FormLabel>
          <Textarea {...register("successMetrics")} />
          <FormHelperText>
            Metrics to measure success of the proposal once accepted and
            actioned upon
          </FormHelperText>
        </FormControl>

        <Flex gap={3}>
          <Spacer />
          <Link href="/" passHref>
            <Button>Cancel</Button>
          </Link>
          <Button colorScheme="blue" isLoading={isLoading} type="submit">
            Save
          </Button>
          <Link href="/" passHref>
          <Button colorScheme="blue" isLoading={isLoading}>
            Submit for RFC
            </Button>
            </Link>
        </Flex>
      </VStack>
    </form>
  );
};

export default ProposalForm;
