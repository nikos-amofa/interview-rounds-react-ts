import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FinalInterviewRound, InterviewRound, InterviewRounds } from "@/types/interviewRound";

export interface InterviewRoundState {
  list: InterviewRounds | null;
}

const initialState: InterviewRoundState = {
  list: null,
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
  },
});

export const { setInterviewRoundListAction, updateInterviewRoundAction } =
  interviewRoundSlice.actions;

export const interviewRoundReducer = interviewRoundSlice.reducer;
