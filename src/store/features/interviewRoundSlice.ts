import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FinalInterviewRound, InterviewRound, InterviewRounds } from "@/types/interviewRound";
import { QA, QAListHash } from "@/types/qa";

export interface InterviewRoundState {
  list: InterviewRounds | null;
  qaListHash: QAListHash;
}

const initialState: InterviewRoundState = {
  list: null,
  qaListHash: {},
};

export const interviewRoundSlice = createSlice({
  name: "interviewRound",
  initialState,
  reducers: {
    setInterviewRoundListAction: (state, action: PayloadAction<InterviewRounds>) => {
      state.list = action.payload;
    },
    updateInterviewRoundAction: (
      state,
      action: PayloadAction<InterviewRound | FinalInterviewRound>
    ) => {
      if (!state.list) return;

      const data = action.payload;
      const idx = state.list.findIndex((ir) => ir.id === data.id);
      if (idx < 0) {
        // TODO: error handling -> error message refresh the page
        return;
      }
      state.list[idx] = data;
    },
    addQAListByInterviewRoundIdAction: (
      state,
      action: PayloadAction<{
        interviewRoundId: number;
        qaList: QA[];
      }>
    ) => {
      const { interviewRoundId, qaList } = action.payload;
      state.qaListHash[interviewRoundId] = qaList;
    },
    addQAToInterviewRoundAction: (
      state,
      action: PayloadAction<{
        interviewRoundId: number;
        qa: QA;
      }>
    ) => {
      const { interviewRoundId, qa } = action.payload;
      state.qaListHash[interviewRoundId].push(qa);
    },
    updateQAAction: (
      state,
      action: PayloadAction<{
        interviewRoundId: number;
        updatedQA: QA;
      }>
    ) => {
      const { interviewRoundId, updatedQA } = action.payload;
      const idx = state.qaListHash[interviewRoundId]?.findIndex((qa) => qa.id === updatedQA.id);
      if (idx === undefined || idx < 0) {
        return;
      }
      state.qaListHash[interviewRoundId][idx] = updatedQA;
    },
  },
});

export const {
  setInterviewRoundListAction,
  updateInterviewRoundAction,
  addQAListByInterviewRoundIdAction,
  addQAToInterviewRoundAction,
  updateQAAction,
} = interviewRoundSlice.actions;

export const interviewRoundReducer = interviewRoundSlice.reducer;
