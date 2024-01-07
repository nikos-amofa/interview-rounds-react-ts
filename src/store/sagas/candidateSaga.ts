import { call, put, takeLatest } from "redux-saga/effects";
import { setCandidateDataAction } from "../features/candidateSlice";
import { fetchCandidateFromApi } from "@/apiService/candidate";
import { Candidate } from "@/types/candidate";

// action types
const FETCH_CANDIDATE_DATA_REQUEST = "FETCH_CANDIDATE_DATA_REQUEST";

// Action creators
export const fetchCandidateDataRequest = () => ({ type: FETCH_CANDIDATE_DATA_REQUEST });

function* fetchCandidateData() {
  const data: Candidate = yield call(fetchCandidateFromApi);
  yield put(setCandidateDataAction(data));
}

export function* candidateSaga() {
  yield takeLatest(FETCH_CANDIDATE_DATA_REQUEST, fetchCandidateData);
}
