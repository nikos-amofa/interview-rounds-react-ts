import {
  InterviewRounds,
  InterviewRound,
  FinalInterviewRound,
  UpdateInterviewRoundParams,
} from "@/types/interviewRound";
import { INTERVIEW_ROUNDS_KEY_NAME } from "./localStorage/interviewRound";

export const fetchInterviewRoundsFromApi = () => {
  const data = localStorage.getItem(INTERVIEW_ROUNDS_KEY_NAME);
  return data ? (JSON.parse(data) as InterviewRounds) : null;
};

export const updateInterviewRoundApi = ({
  id,
  ...data
}: UpdateInterviewRoundParams): InterviewRound | FinalInterviewRound => {
  const localData = localStorage.getItem(INTERVIEW_ROUNDS_KEY_NAME);
  const list = localData ? (JSON.parse(localData) as InterviewRounds) : null;

  if (!list) {
    throw Error("API error");
  }

  const idx = list.findIndex((ir) => ir.id === id);

  if (idx < 0) throw new Error("Not Found");

  const response: InterviewRound | FinalInterviewRound = {
    ...list[idx],
    ...data,
    statusUpdatedAt: new Date().toISOString(),
  };

  list[idx] = response;
  localStorage.setItem(INTERVIEW_ROUNDS_KEY_NAME, JSON.stringify(list));

  return response;
};
