import { call, put, takeLatest } from "redux-saga/effects";
import {
  setInterviewRoundListAction,
  updateInterviewRoundAction,
} from "../features/interviewRoundSlice";
import { fetchInterviewRoundsFromApi, updateInterviewRoundApi } from "@/apiService/interviewRound";
import {
  FinalInterviewRound,
  InterviewRound,
  InterviewRounds,
  UpdateInterviewRoundParams,
} from "@/types/interviewRound";
import { PayloadAction } from "@reduxjs/toolkit";

// action types
const FETCH_INTERVIEW_ROUNDS_REQUEST = "FETCH_INTERVIEW_ROUNDS_REQUEST";
const UPDATE_INTERVIEW_ROUND_REQUEST = "UPDATE_INTERVIEW_ROUND_REQUEST";

// payload action types
export type UpdateInterviewRoundAction = PayloadAction<
  UpdateInterviewRoundParams,
  typeof UPDATE_INTERVIEW_ROUND_REQUEST
>;

// action creators
export const fetchInterviewRoundsRequest = () => ({ type: FETCH_INTERVIEW_ROUNDS_REQUEST });
export const updateInterviewRoundRequest = (
  id: number,
  data: InterviewRound | FinalInterviewRound
) => ({
  type: UPDATE_INTERVIEW_ROUND_REQUEST,
  payload: { id, data },
});

// generators

function* fetchInterviewRounds() {
  const data: InterviewRounds = yield call(fetchInterviewRoundsFromApi);
  yield put(setInterviewRoundListAction(data));
}

function* updateInterviewRound({ payload }: UpdateInterviewRoundAction) {
  const response: InterviewRound | FinalInterviewRound = yield call(
    updateInterviewRoundApi,
    payload
  );
  yield put(updateInterviewRoundAction(response));
}

export function* interviewRoundSaga() {
  yield takeLatest(FETCH_INTERVIEW_ROUNDS_REQUEST, fetchInterviewRounds);
  yield takeLatest(UPDATE_INTERVIEW_ROUND_REQUEST, updateInterviewRound);
}
