import { Proposal } from "@prisma/client";
import ProposalForm from "components/proposalForm";

const UpdateDraft = (props: Proposal) => {
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
    return (
        <ProposalForm />
    )
}

export default UpdateDraft;

/*
1. Update API endpoint - create a new file
2. React hook that does the update
3. Create component
4. Add routing to button
*/