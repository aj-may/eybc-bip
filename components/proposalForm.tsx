import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
  Textarea,
  VStack,
  Select,
  FormErrorMessage,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCreateProposal } from "lib/useProposals";
import { useLeadershipSponsor } from "lib/useLeadershipSponsor";
import { Proposal, ProposalStatus, RFCStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";
import AlertDialogue from "./AlertDialogue";

const ProposalForm = () => {
  const initProposal: Proposal = {
    name: "",
    author: "",
    coAuthors: "",
    dateProposal: new Date(),
    championshipTeam: "",
    leadershipSponsor: "",
    summary: "",
    motivation: "",
    specifications: "",
    risks: "",
    successMetrics: "",
    id: "",
    status: ProposalStatus.DRAFT,
    rfcStatus: RFCStatus.NONE,
  };
  const router = useRouter();
  const toast = useToast();
  const {
    isOpen: isOpenRFCDialog,
    onOpen: onOpenRFCDialog,
    onClose: onCloseRFCDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenCancelDialog,
    onOpen: onOpenCancelDialog,
    onClose: onCloseCancelDialog,
  } = useDisclosure();
  const {
    isOpen: isOpenDraftDialog,
    onOpen: onOpenDraftDialog,
    onClose: onCloseDraftDialog,
  } = useDisclosure();

  const rfcRef = React.useRef<HTMLElement>(
    null
  ) as React.MutableRefObject<HTMLElement>;
  const CancellRef = React.useRef<HTMLElement>(
    null
  ) as React.MutableRefObject<HTMLElement>;
  const DraftRef = React.useRef<HTMLElement>(
    null
  ) as React.MutableRefObject<HTMLElement>;

  const { leadershipSponsors } = useLeadershipSponsor();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Proposal>({ mode: "onSubmit" });

  const { createProposal, isLoading } = useCreateProposal();
  const [rfcFinalProposal, setRfcFinalProposal] =
    useState<Proposal>(initProposal);
  const [draftProposal, setdraftProposal] = useState<Proposal>(initProposal);

  const onSubmitDraft = (proposal: Proposal) => {
    //changing the status to DRAFT before pushing it.
    proposal.status = "DRAFT";
    setdraftProposal(proposal);
    //open the modal
    onOpenDraftDialog();
  };

  const onSubmitRFC = (proposal: Proposal) => {
    //changing the status to RFC before pushing it.
    proposal.status = "RFC";
    proposal.rfcStatus = "UNPUBLISHED";

    const {
      name,
      coAuthors,
      dateProposal,
      championshipTeam,
      leadershipSponsor,
      summary,
      motivation,
      specifications,
      risks,
      successMetrics,
    } = proposal;
    if (
      !name ||
      !coAuthors ||
      !dateProposal ||
      !championshipTeam ||
      !leadershipSponsor ||
      !summary ||
      !motivation ||
      !specifications ||
      !risks ||
      !successMetrics
    ) {
      toast({
        title: "RFC requires all the fields",
        description: "We need all the fields to be populated",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      setRfcFinalProposal(proposal);
      //open the modal
      onOpenRFCDialog();
    }
  };

  const handleCancel = () => {
    onOpenCancelDialog();
  };
  const handleDraft = () => {
    onOpenCancelDialog();
  };

  let LeadershipOptions: JSX.Element[] = [];
  if (leadershipSponsors) {
    LeadershipOptions = leadershipSponsors?.map((val) => (
      <option value={val.name} key={val.id}>
        {val.name}
      </option>
    ));
  }

  return (
    <form onSubmit={handleSubmit(onSubmitRFC)}>
      <AlertDialogue
        isOpen={isOpenRFCDialog}
        onClose={onCloseRFCDialog}
        dialogRef={rfcRef}
        header={"Submit Proposal to RFC"}
        content="Are you sure you want to submit your proposal for RFC?"
        onAccept={() => {
          createProposal(rfcFinalProposal, {
            onSuccess: () => router.push("/rfc"),
          });
          onCloseRFCDialog();
        }}
      />
      <AlertDialogue
        isOpen={isOpenDraftDialog}
        onClose={onCloseDraftDialog}
        dialogRef={DraftRef}
        header={"Submit Proposal to Draft"}
        content="Are you sure you want to submit your proposal for Draft?"
        onAccept={() => {
          createProposal(draftProposal, {
            onSuccess: () => router.push("/draft"),
          });
          onCloseDraftDialog();
        }}
      />
      <AlertDialogue
        isOpen={isOpenCancelDialog}
        onClose={onCloseCancelDialog}
        dialogRef={CancellRef}
        header={"Cancel Proposal"}
        content="Are you sure you want to delete your proposal?"
        onAccept={() => {
          router.push("/"), onCloseCancelDialog();
        }}
      />

      <VStack align="stretch" spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel {...register("id")}></FormLabel>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>Title of BIP:</FormLabel>
          <Input
            maxLength={50}
            {...register("name", { required: true, maxLength: 50 })}
            autoComplete="off"
          />
          {errors.name ? (
            <FormErrorMessage>This field is required</FormErrorMessage>
          ) : (
            <div />
          )}
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
          <Select
            placeholder="Select option"
            {...register("leadershipSponsor")}
          >
            {LeadershipOptions}
          </Select>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.summary}>
          <FormLabel>Simple Summary/Abstract:</FormLabel>
          <FormHelperText>
            Provide one to two sentences that describe the proposal at a high
            level.
          </FormHelperText>
          <Textarea minH="10rem" {...register("summary", { required: true })} />
          {errors.summary ? (
            <FormErrorMessage>This field is required</FormErrorMessage>
          ) : (
            <div />
          )}
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

        <Flex gap={3}>
          <Spacer />
          <Button id="cancelButton" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            id="submitDraft"
            onClick={handleSubmit(onSubmitDraft)}
            colorScheme="blue"
            isLoading={isLoading}
            type="submit"
          >
            Save as Draft
          </Button>
          <Link href="#" passHref>
            <Button
              id="submitRFC"
              colorScheme="green"
              onClick={handleSubmit(onSubmitRFC)}
              type="submit"
              isLoading={isLoading}
            >
              Submit for RFC
            </Button>
          </Link>
        </Flex>
      </VStack>
    </form>
  );
};

export default ProposalForm;
