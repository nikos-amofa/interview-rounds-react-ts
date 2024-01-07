import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { InterviewRoundAccordion } from "./InterviewRoundAccordion";
import { useState } from "react";
import { AddQuestionModal } from "./AddQuestionModal";
import { addQuestionRequest } from "@/store/sagas/interviewRoundSaga";

export const InterviewRoundList = () => {
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { list: interviewRoundList, qaListHash } = useSelector(
    (state: RootState) => state.interviewRound
  );
  const [selectedInterviewRoundId, setSelectedInterviewRoundId] = useState<number | null>(null);

  if (!interviewRoundList) {
    // TODO: implement loading, error from the api
    return <>Fetching...</>;
  }

  const handleModalOpen = (interviewRoundId: number) => () => {
    setSelectedInterviewRoundId(interviewRoundId);
    setAddQuestionModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedInterviewRoundId(null);
    setAddQuestionModalOpen(false);
  };

  const handleAddQuestion = (question: string) => {
    if (selectedInterviewRoundId === null) return;
    dispatch(
      addQuestionRequest({
        question,
        interviewRoundId: selectedInterviewRoundId,
      })
    );
    handleModalClose();
  };

  return (
    <>
      {interviewRoundList.map((ir) => (
        <InterviewRoundAccordion
          key={ir.id}
          data={ir}
          qaListHash={qaListHash}
          onAddQuestion={handleModalOpen(ir.id)}
        />
      ))}
      <AddQuestionModal
        open={addQuestionModalOpen}
        onClose={handleModalClose}
        onAddQuestion={handleAddQuestion}
      />
    </>
  );
};
