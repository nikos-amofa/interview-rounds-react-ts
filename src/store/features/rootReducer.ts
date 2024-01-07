import { combineReducers } from "@reduxjs/toolkit";
import { roleReducer } from "./roleSlice";

export const rootReducer = combineReducers({
  role: roleReducer,
});
