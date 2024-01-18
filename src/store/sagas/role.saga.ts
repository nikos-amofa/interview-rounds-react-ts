import { call, put, takeLatest } from "redux-saga/effects";
import { setRoleListAction } from "@/store/features/role.slice";
import { fetchRoleListFromApi } from "@/apiService/role";
import { Role } from "@/types/role";
import { FETCH_ROLE_LIST_REQUEST } from "../actions/types";

function* fetchRoleList() {
  const list: Role[] = yield call(fetchRoleListFromApi);
  yield put(setRoleListAction(list));
}

export function* roleSaga() {
  yield takeLatest(FETCH_ROLE_LIST_REQUEST, fetchRoleList);
}
