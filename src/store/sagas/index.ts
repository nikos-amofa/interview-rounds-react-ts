import { all } from "redux-saga/effects";
import { roleSaga } from "./roleSaga";
import { candidateSaga } from "./candidateSaga";

export function* rootSaga() {
  yield all([roleSaga(), candidateSaga()]);
}
