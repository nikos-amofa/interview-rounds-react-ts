import { QA } from "@/types/qa";
import { FC } from "react";
import { QAPaper } from "./QAPaper";

interface QAListProps {
  interviewRoundId: number;
  qaList: QA[];
}

export const QAList: FC<QAListProps> = ({ interviewRoundId, qaList }) => {
  return (
    <>
      {qaList.map((qa) => (
        <QAPaper key={qa.id} interviewRoundId={interviewRoundId} qa={qa} />
      ))}
    </>
  );
};
