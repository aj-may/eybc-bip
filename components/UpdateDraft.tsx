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
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useLeadershipSponsor } from "lib/useLeadershipSponsor";
import { Proposal } from "@prisma/client";
import { useUpdateDraft } from "lib/useDrafts";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const UpdateDraft = (props: Proposal) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm<Proposal>({ mode: "onSubmit" });
  const { updateDraft } = useUpdateDraft(props.id);
  const [date, setDate] = useState<Date>();
  const { leadershipSponsors } = useLeadershipSponsor();

  useEffect(() => {
    if (props) {
      reset({
        id: props.id,
        name: props.name,
        coAuthors: props.coAuthors,
        dateProposal: props.dateProposal,
        championshipTeam: props.championshipTeam,
        leadershipSponsor: props.leadershipSponsor,
        summary: props.summary,
        motivation: props.motivation,
        specifications: props.specifications,
        risks: props.risks,
        successMetrics: props.successMetrics,
        status: props.status,
      });
    }
  }, [reset, props.name]);

  let selectOptions: JSX.Element[] = [];
  if (leadershipSponsors) {
    selectOptions = leadershipSponsors?.map((val) => (
      <option value={val.name} key={val.id}>
        {val.name}
      </option>
    ));
  }

  const submitButtonClicked = (proposal: Proposal) => {
    updateDraft(proposal, { onSuccess: () => router.push("/draft") });
  };
  let convertedDate = props.dateProposal
    ? new Date(props.dateProposal)
    : undefined;

  return (
    <form onSubmit={handleSubmit(submitButtonClicked)}>
      <VStack align="stretch" spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel hidden>{props.id} </FormLabel>
          <Input {...register("id")} hidden />
        </FormControl>

        <FormControl isRequired>
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
          <Controller
            control={control}
            name="dateProposal"
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={onChange}
                selected={convertedDate}
                value={value ? new Date(value).toDateString() : ""}
              />
            )}
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
          <Select
            placeholder="Select option"
            {...register("leadershipSponsor")}
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

        <FormControl hidden>
          <FormLabel>Status</FormLabel>
          <Input {...register("status")} />
        </FormControl>

        <Flex gap={3}>
          <Spacer />
          <Link href="/" passHref>
            <Button>Cancel</Button>
          </Link>
          <Button colorScheme="blue" type="submit">
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
