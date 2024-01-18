import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Candidate } from "@/types/candidate";

export interface CandidateState {
  data: Candidate | null;
}

const initialState: CandidateState = {
  data: null,
};

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    setCandidateDataAction: (state, action: PayloadAction<Candidate>) => {
      state.data = action.payload;
    },
  },
});

export const { setCandidateDataAction } = candidateSlice.actions;

export const candidateReducer = candidateSlice.reducer;
