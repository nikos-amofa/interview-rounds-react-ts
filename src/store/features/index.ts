import { combineReducers } from "@reduxjs/toolkit";
import { roleReducer } from "./role.slice";
import { candidateReducer } from "./candidate.slice";
import { interviewRoundReducer } from "./interviewRound.slice";

export const rootReducer = combineReducers({
  role: roleReducer,
  interviewRound: interviewRoundReducer,
  candidate: candidateReducer,
});
