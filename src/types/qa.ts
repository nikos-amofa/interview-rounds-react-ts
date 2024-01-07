import { Interviewer } from "./interviewer";

export interface QA {
  id: number;
  question: string;
  answer: string;
  interviewer: Interviewer;
}

export interface QAListHash {
  [interviewRoundId: number]: QA[];
}
