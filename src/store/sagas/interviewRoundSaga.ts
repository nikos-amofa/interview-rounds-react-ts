import { call, put, takeLatest } from "redux-saga/effects";
import {
  addQAListByInterviewRoundIdAction,
  setInterviewRoundListAction,
  addQAToInterviewRoundAction,
  updateQAAction,
} from "../features/interviewRoundSlice";
import {
  addQuestionToInterviewRoundApi,
  fetchInterviewRoundsFromApi,
  fetchQAListByInterviewRoundIdApi,
  updateInterviewRoundApi,
  updateQAApi,
} from "@/apiService/interviewRound";
import {
  AddQuestionParams,
  InterviewRounds,
  UpdateInterviewRoundParams,
  UpdateQAParams,
} from "@/types/interviewRound";
import { PayloadAction } from "@reduxjs/toolkit";
import { QA } from "@/types/qa";

// action types
const FETCH_INTERVIEW_ROUNDS_REQUEST = "FETCH_INTERVIEW_ROUNDS_REQUEST";
const UPDATE_INTERVIEW_ROUND_REQUEST = "UPDATE_INTERVIEW_ROUND_REQUEST";
const FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST = "FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST";
const ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST = "ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST";
const UPDATE_QA_REQUEST = "UPDATE_QA_REQUEST";

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
export const fetchInterviewRoundsRequest = () => ({ type: FETCH_INTERVIEW_ROUNDS_REQUEST });
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

// generators

function* fetchInterviewRounds() {
  const data: InterviewRounds = yield call(fetchInterviewRoundsFromApi);
  yield put(setInterviewRoundListAction(data));
}

function* updateInterviewRound({ payload }: UpdateInterviewRoundAction) {
  yield call(updateInterviewRoundApi, payload);
  yield put(fetchInterviewRoundsRequest());
}

function* fetchQAListByInterviewRoundId({
  payload: interviewRoundId,
}: FetchQAListByInterviewRoundIdAction) {
  const qaList: QA[] = yield call(fetchQAListByInterviewRoundIdApi, interviewRoundId);
  yield put(
    addQAListByInterviewRoundIdAction({
      interviewRoundId,
      qaList,
    })
  );
}

function* addQuestionToInterviewRound({ payload }: AddQuestionAction) {
  const response: QA = yield call(addQuestionToInterviewRoundApi, payload);
  yield put(
    addQAToInterviewRoundAction({
      interviewRoundId: payload.interviewRoundId,
      qa: response,
    })
  );
}

function* updateQA({ payload }: UpdateQAAction) {
  const updatedQA: QA = yield call(updateQAApi, payload);
  yield put(
    updateQAAction({
      interviewRoundId: payload.interviewRoundId,
      updatedQA,
    })
  );
}

export function* interviewRoundSaga() {
  yield takeLatest(FETCH_INTERVIEW_ROUNDS_REQUEST, fetchInterviewRounds);
  yield takeLatest(UPDATE_INTERVIEW_ROUND_REQUEST, updateInterviewRound);
  yield takeLatest(FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST, fetchQAListByInterviewRoundId);
  yield takeLatest(ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST, addQuestionToInterviewRound);
  yield takeLatest(UPDATE_QA_REQUEST, updateQA);
}
