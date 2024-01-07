import { call, put, takeLatest } from "redux-saga/effects";
import { setRoleListAction } from "@/store/features/roleSlice";
import { fetchRoleListFromApi } from "@/apiService/role";
import { Role } from "@/types/role";

// action types
const FETCH_ROLE_LIST_REQUEST = "FETCH_ROLE_LIST_REQUEST";

// Action creators
export const fetchRoleListRequest = () => ({ type: FETCH_ROLE_LIST_REQUEST });

function* fetchRoleList() {
  const list: Role[] = yield call(fetchRoleListFromApi);
  yield put(setRoleListAction(list));
}

export function* roleSaga() {
  yield takeLatest(FETCH_ROLE_LIST_REQUEST, fetchRoleList);
}
