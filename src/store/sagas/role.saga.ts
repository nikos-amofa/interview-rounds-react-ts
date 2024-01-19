import {
  call,
  put,
  takeLatest,
  take,
  fork,
  actionChannel,
  ActionPattern,
  all,
} from "redux-saga/effects";
import { setRoleListAction } from "@/store/features/role.slice";
import { fetchRoleListFromApi } from "@/apiService/role";
import { Role } from "@/types/role";
import { FETCH_ROLE_LIST_REQUEST, SHORT_PERIOD_REQUEST } from "../actions/types";
import { sleep } from "@/apiService/helpers";

function* fetchRoleList() {
  const list: Role[] = yield call(fetchRoleListFromApi);
  yield put(setRoleListAction(list));
}

/* process SHORT_PERIOD_REQUEST in parallel, same as takeEvery */
// function* handleRequest(payload: number) {
//   // api request
//   yield call(sleep, 1000);
//   console.log("payload", payload);
// }
// function* watchRequests() {
//   while (true) {
//     const { payload }: { payload: number } = yield take(SHORT_PERIOD_REQUEST);
//     yield fork(handleRequest, payload);
//   }
// }

/* process SHORT_PERIOD_REQUEST in serial */
function* watchRequests() {
  const requestChan: ActionPattern = yield actionChannel(SHORT_PERIOD_REQUEST);

  while (true) {
    const { payload }: { payload: number } = yield take(requestChan);
    // api request
    yield call(sleep, 1000);
    console.log("payload", payload);
  }
}

export function* roleSaga() {
  yield all([watchRequests(), takeLatest(FETCH_ROLE_LIST_REQUEST, fetchRoleList)]);
}
