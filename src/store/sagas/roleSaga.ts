import { put, takeLatest } from "redux-saga/effects";
import { setRoleListAction } from "@/store/features/roleSlice";
import { ROLE_LIST } from "@/constants/role";

// action types
export const FETCH_ROLE_LIST_REQUEST = "FETCH_ROLE_LIST_REQUEST";

// Action creators
export const fetchRoleListRequest = () => ({ type: FETCH_ROLE_LIST_REQUEST });

function* fetchRoleList() {
  const list = [...ROLE_LIST];
  yield put(setRoleListAction(list));
}

export function* roleSaga() {
  yield takeLatest(FETCH_ROLE_LIST_REQUEST, fetchRoleList);
}
