import {
  AddQuestionParams,
  UpdateInterviewRoundParams,
  UpdateQAParams,
} from "@/types/interviewRound";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST,
  FETCH_INTERVIEW_ROUNDS_REQUEST,
  FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST,
  UPDATE_INTERVIEW_ROUND_REQUEST,
  UPDATE_QA_REQUEST,
} from "./types";

// payload action types
export type UpdateInterviewRoundAction = PayloadAction<
  UpdateInterviewRoundParams,
  typeof UPDATE_INTERVIEW_ROUND_REQUEST
>;
export type FetchQAListByInterviewRoundIdAction = PayloadAction<
  number,
  typeof FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST
>;
export type AddQuestionAction = PayloadAction<
  AddQuestionParams,
  typeof ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST
>;
export type UpdateQAAction = PayloadAction<UpdateQAParams, typeof UPDATE_QA_REQUEST>;

// action creators
export const fetchInterviewRoundsRequest = () => ({
  type: FETCH_INTERVIEW_ROUNDS_REQUEST,
});
export const updateInterviewRoundRequest = (payload: UpdateInterviewRoundParams) => ({
  type: UPDATE_INTERVIEW_ROUND_REQUEST,
  payload,
});
export const fetchQAListByInterviewRoundIdRequest = (id: number) => ({
  type: FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST,
  payload: id,
});
export const addQuestionRequest = (payload: AddQuestionParams) => ({
  type: ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST,
  payload,
});
export const updateQARequest = (payload: UpdateQAParams) => ({
  type: UPDATE_QA_REQUEST,
  payload,
});
