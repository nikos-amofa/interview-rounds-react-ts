import { combineReducers } from "@reduxjs/toolkit";
import { roleReducer } from "./roleSlice";
import { candidateReducer } from "./candidateSlice";
import { interviewRoundReducer } from "./interviewRoundSlice";

export const rootReducer = combineReducers({
  role: roleReducer,
  interviewRound: interviewRoundReducer,
  candidate: candidateReducer,
});
