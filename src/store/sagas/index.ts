import { all } from "redux-saga/effects";
import { candidateSaga } from "./candidateSaga";
import { interviewRoundSaga } from "./interviewRoundSaga";
import { roleSaga } from "./roleSaga";

export function* rootSaga() {
  yield all([candidateSaga(), interviewRoundSaga(), roleSaga()]);
}
