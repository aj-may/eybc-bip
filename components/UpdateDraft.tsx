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

  const [name, setName] = useState<string>();
  const getName = () => {
    setName(props.name);
  };
  useEffect(() => {
    getName();
  });

  const [coAuthors, setCoAuthors] = useState<string>();
  const getCoAuthors = () => {
    setCoAuthors(props.coAuthors);
  };
  useEffect(() => {
    getCoAuthors();
  });

  const [dateProposal, setDateProposal] = useState<any>();
  const getDateProposal = () => {
    setDateProposal(props.dateProposal);
  };
  useEffect(() => {
    getDateProposal();
  });

  const [championshipTeam, setChampionshipTeam] = useState<string>();
  const getChampionshipTeam = () => {
    setChampionshipTeam(props.championshipTeam);
  };
  useEffect(() => {
    getChampionshipTeam();
  });

  const [leadershipSponsor, setLeadershipSponsor] = useState<string>();
  const getLeadershipSponsor = () => {
    setLeadershipSponsor(props.leadershipSponsor);
  };
  useEffect(() => {
    getLeadershipSponsor();
  });

  const [summary, setSummary] = useState<string>();
  const getSummary = () => {
    setSummary(props.summary);
  };
  useEffect(() => {
    getSummary();
  });

  const [motivation, setMotivation] = useState<string>();
  const getMotivation = () => {
    setMotivation(props.motivation);
  };
  useEffect(() => {
    getMotivation();
  });

  const [specifications, setSpecifications] = useState<string>();
  const getSpecifications = () => {
    setSpecifications(props.specifications);
  };
  useEffect(() => {
    getSpecifications();
  });

  const [risks, setRisks] = useState<string>();
  const getRisks = () => {
    setRisks(props.risks);
  };
  useEffect(() => {
    getRisks();
  });

  const [successMetrics, setSuccessMetrics] = useState<string>();
  const getSuccessMetrics = () => {
    setSuccessMetrics(props.successMetrics);
  };
  useEffect(() => {
    getSuccessMetrics();
  });

  const [status, setStatus] = useState<string>();
  const getStatus = () => {
    setStatus(props.status);
  };
  useEffect(() => {
    getStatus();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="stretch" spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel {...props.id} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Title of BIP:</FormLabel>
          <Input
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Co-Authors:</FormLabel>
          <FormHelperText>Enter full names of all co-authors.</FormHelperText>
          <Input
            defaultValue={coAuthors}
            onChange={(e) => {
              setCoAuthors(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Date Proposed:</FormLabel>
          <Input
            defaultValue={dateProposal}
            placeholder="Select Proposal Submission Date"
            type="date"
            autoComplete="off"
            onChange={(e) => {
              setDateProposal(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Championship Team:</FormLabel>
          <FormHelperText>
            Enter full names of volunteers supporting.
          </FormHelperText>
          <Input
            defaultValue={championshipTeam}
            autoComplete="off"
            onChange={(e) => {
              setChampionshipTeam(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Leadership Sponsor:</FormLabel>
          <Select
            placeholder="Select option"
            onChange={(e) => {
              setLeadershipSponsor(e.target.value);
            }}
            defaultValue={leadershipSponsor}
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
          <Textarea
            minH="10rem"
            defaultValue={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Motivation(s):</FormLabel>
          <FormHelperText>
            Clearly describe the problem statement and the value it adds. Show
            why this proposal is valuable to our practice.
          </FormHelperText>
          <Textarea
            defaultValue={motivation}
            onChange={(e) => {
              setMotivation(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Specifications</FormLabel>
          <FormHelperText>
            Enter detailed description of the proposal. Feel free to add
            rationale explaining why certain design choices were made in the
            specification.
          </FormHelperText>
          <Textarea
            defaultValue={specifications}
            onChange={(e) => {
              setSpecifications(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Risks/Impediments</FormLabel>
          <FormHelperText>
            Document any potential risks that will slow or block this effort.
          </FormHelperText>
          <Textarea
            defaultValue={risks}
            onChange={(e) => {
              setRisks(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Success Metrics</FormLabel>
          <FormHelperText>
            Enter metrics that will be used to measure the success of the
            proposal once accepted and actioned upon.
          </FormHelperText>
          <Textarea
            defaultValue={successMetrics}
            onChange={(e) => {
              setSuccessMetrics(e.target.value);
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Input
            defaultValue={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
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
