import { Select } from "@chakra-ui/react";
import { Proposal } from "@prisma/client";
import { useForm } from "react-hook-form";

export const PracticeLeaders = () => {
  const {
    register,
    formState: { errors },
  } = useForm<Proposal>();
  return (
    <Select
      placeholder="Select Leadership Sponsor"
      {...register("leadershipSponsor")}
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
  );
};
