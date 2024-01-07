export const AllStatusOptions = ["LOCKED", "UNLOCKED", "PASSED", "FAILED"] as const;
type StatusOptionsTuple = typeof AllStatusOptions;
export type Status = StatusOptionsTuple[number];

export interface BaseInterviewRound {
  id: number;
  title: string;
  status: Status;
  statusUpdatedAt: string | null;
  order: number;
}

export interface InterviewRound extends BaseInterviewRound {
  fittingRoleIds: string[] | null;
}

export interface FinalInterviewRound extends BaseInterviewRound {
  finalRoleId: string | null;
}

export type InterviewRounds = [...InterviewRound[], FinalInterviewRound];

export type UpdateInterviewRoundParams =
  | {
      id: number;
      status: Status;
      fittingRoleIds?: string[] | null;
    }
  | {
      id: number;
      status: Status;
      finalRoleId?: string | null;
    };

export interface AddQuestionParams {
  question: string;
  interviewRoundId: number;
}

export interface UpdateQAParams {
  // this is for MVP with localStorage, interviewRoundId is not neceessary for real backend
  interviewRoundId: number;
  qaId: number;
  question?: string;
  answer?: string;
}
