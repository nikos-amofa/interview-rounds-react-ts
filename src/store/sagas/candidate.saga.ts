import { call, put, takeLatest } from "redux-saga/effects";
import { setCandidateDataAction } from "../features/candidate.slice";
import { fetchCandidateFromApi } from "@/apiService/candidate";
import { Candidate } from "@/types/candidate";
import { FETCH_CANDIDATE_DATA_REQUEST } from "../actions/types";

function* fetchCandidateData() {
  const data: Candidate = yield call(fetchCandidateFromApi);
  yield put(setCandidateDataAction(data));
}

export function* candidateSaga() {
  yield takeLatest(FETCH_CANDIDATE_DATA_REQUEST, fetchCandidateData);
}
