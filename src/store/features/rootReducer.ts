import { combineReducers } from "@reduxjs/toolkit";
import { roleReducer } from "./roleSlice";
import { candidateReducer } from "./candidateSlice";

export const rootReducer = combineReducers({
  role: roleReducer,
  candidate: candidateReducer,
});
