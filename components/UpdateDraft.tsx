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

  // const [author, setAuthor] = useState();

  // const getAuthor = () => {
  //   setAuthor(draft.author);
  // };

  // useEffect(() => {
  //   getAuthor();
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel {...props.id} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Title of BIP:</FormLabel>
          <Input value={props.name} />
        </FormControl>

        <FormControl>
          <FormLabel>Co-Authors:</FormLabel>
          <FormHelperText>Enter full names of all co-authors.</FormHelperText>
          <Input value={props.coAuthors} />
        </FormControl>

        <FormControl>
          <FormLabel>Date Proposed:</FormLabel>
          <Input
            value={props.dateProposal}
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
          <Input value={props.championshipTeam} autoComplete="off" />
        </FormControl>

        <FormControl>
          <FormLabel>Leadership Sponsor:</FormLabel>
          <Select placeholder="Select option" value={props.leadershipSponsor}>
            {selectOptions}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Simple Summary/Abstract:</FormLabel>
          <FormHelperText>
            Provide one to two sentences that describe the proposal at a high
            level.
          </FormHelperText>
          <Textarea minH="10rem" value={props.summary} />
        </FormControl>

        <FormControl>
          <FormLabel>Motivation(s):</FormLabel>
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
          <Textarea value={props.motivation} />
        </FormControl>

        <FormControl>
          <FormLabel>Specifications</FormLabel>
          <FormHelperText>
            Enter detailed description of the proposal. Feel free to add
            rationale explaining why certain design choices were made in the
            specification.
          </FormHelperText>
          <Textarea value={props.specifications} />
        </FormControl>

        <FormControl>
          <FormLabel>Risks/Impediments</FormLabel>
          <FormHelperText>
            Document any potential risks that will slow or block this effort.
          </FormHelperText>
          <Textarea value={props.risks} />
        </FormControl>

        <FormControl>
          <FormLabel>Success Metrics</FormLabel>
          <FormHelperText>
            Enter metrics that will be used to measure the success of the
            proposal once accepted and actioned upon.
          </FormHelperText>
          <Textarea value={props.successMetrics} />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input value={props.status} />
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
