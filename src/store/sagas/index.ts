import { all } from "redux-saga/effects";
import { candidateSaga } from "./candidate.saga";
import { interviewRoundSaga } from "./interviewRound.saga";
import { roleSaga } from "./role.saga";

export function* rootSaga() {
  yield all([candidateSaga(), interviewRoundSaga(), roleSaga()]);
}
