import { all } from "redux-saga/effects";
import { roleSaga } from "./roleSaga";

export function* rootSaga() {
  yield all([roleSaga()]);
}
