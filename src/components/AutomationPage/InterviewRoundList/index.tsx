import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { InterviewRoundAccordion } from "./InterviewRoundAccordion";

export const InterviewRoundList = () => {
  const { list: interviewRoundList } = useSelector((state: RootState) => state.interviewRound);

  if (!interviewRoundList) {
    // TODO: implement loading, error from the api
    return <>Fetching...</>;
  }

  return (
    <>
      {interviewRoundList.map((ir) => (
        <InterviewRoundAccordion key={ir.id} data={ir} />
      ))}
    </>
  );
};
