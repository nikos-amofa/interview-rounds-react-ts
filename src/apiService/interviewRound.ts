import {
  InterviewRounds,
  InterviewRound,
  FinalInterviewRound,
  UpdateInterviewRoundParams,
  AddQuestionParams,
  UpdateQAParams,
} from "@/types/interviewRound";
import { INTERVIEW_ROUNDS_KEY_NAME, qaListKeyName } from "./localStorage/interviewRound";
import { QA } from "@/types/qa";
import { interviewer } from "./localStorage/interviewer";

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

  const currentDate = new Date().toISOString();

  const response: InterviewRound | FinalInterviewRound = {
    ...list[idx],
    ...data,
    statusUpdatedAt: currentDate,
  };

  list[idx] = response;

  // if passed, unlock the next interview round
  if (idx < list.length - 1 && data.status === "PASSED") {
    list[idx + 1].status = "UNLOCKED";
    list[idx + 1].statusUpdatedAt = currentDate;
  }
  localStorage.setItem(INTERVIEW_ROUNDS_KEY_NAME, JSON.stringify(list));

  return response;
};

export const fetchQAListByInterviewRoundIdApi = (id: number) => {
  const data = localStorage.getItem(qaListKeyName(id));
  return data ? (JSON.parse(data) as QA[]) : [];
};

export const addQuestionToInterviewRoundApi = ({
  question,
  interviewRoundId,
}: AddQuestionParams): QA => {
  const data = localStorage.getItem(qaListKeyName(interviewRoundId));
  const list = data ? (JSON.parse(data) as QA[]) : [];

  // This is not exact mimic of the backend, as different interview round can have same questionId
  // But this still works only on the frontend with localstorage
  const questionId = list.length ? list[list.length - 1].id + 1 : 1;
  const response: QA = {
    id: questionId,
    question,
    answer: "",
    interviewer,
  };
  list.push(response);

  localStorage.setItem(qaListKeyName(interviewRoundId), JSON.stringify(list));

  return response;
};

export const updateQAApi = ({ interviewRoundId, qaId, ...qa }: UpdateQAParams): QA => {
  const data = localStorage.getItem(qaListKeyName(interviewRoundId));
  if (!data) {
    throw new Error("API error");
  }
  const qaList = data ? (JSON.parse(data) as QA[]) : [];

  const idx = qaList.findIndex((qa) => qa.id === qaId);
  if (idx < 0) throw new Error("Not Found");

  const updatedQA: QA = {
    ...qaList[idx],
    ...qa,
  };

  qaList[idx] = updatedQA;
  localStorage.setItem(qaListKeyName(interviewRoundId), JSON.stringify(qaList));

  return updatedQA;
};
