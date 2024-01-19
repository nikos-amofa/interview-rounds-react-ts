import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  setQAListByInterviewRoundIdAction,
  setInterviewRoundListAction,
  addQAToInterviewRoundAction,
  updateQAAction,
} from "../features/interviewRound.slice";
import {
  addQuestionToInterviewRoundApi,
  fetchInterviewRoundsFromApi,
  fetchQAListByInterviewRoundIdApi,
  updateInterviewRoundApi,
  updateQAApi,
} from "@/apiService/interviewRound";
import { InterviewRounds } from "@/types/interviewRound";
import { QA } from "@/types/qa";
import {
  AddQuestionAction,
  FetchQAListByInterviewRoundIdAction,
  UpdateInterviewRoundAction,
  UpdateQAAction,
  fetchInterviewRoundsRequest,
} from "../actions/interviewRound.action";
import {
  ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST,
  FETCH_INTERVIEW_ROUNDS_REQUEST,
  FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST,
  UPDATE_INTERVIEW_ROUND_REQUEST,
  UPDATE_QA_REQUEST,
} from "../actions/types";

function* fetchInterviewRounds() {
  const data: InterviewRounds = yield call(fetchInterviewRoundsFromApi);
  yield put(setInterviewRoundListAction(data));
}

function* updateInterviewRound({ payload }: UpdateInterviewRoundAction) {
  yield call(updateInterviewRoundApi, payload);
  yield put(fetchInterviewRoundsRequest());
}

function* fetchQAListByInterviewRoundId({
  payload: interviewRoundId,
}: FetchQAListByInterviewRoundIdAction) {
  const qaList: QA[] = yield call(fetchQAListByInterviewRoundIdApi, interviewRoundId);
  yield put(
    setQAListByInterviewRoundIdAction({
      interviewRoundId,
      qaList,
    })
  );
}

function* addQuestionToInterviewRound({ payload }: AddQuestionAction) {
  try {
    const response: QA = yield call(addQuestionToInterviewRoundApi, payload);
    yield put(
      addQAToInterviewRoundAction({
        interviewRoundId: payload.interviewRoundId,
        qa: response,
      })
    );
  } catch (err) {
    // error handling
    console.error(err);
    // yield call(sentryLog, err)
    // yield put(errorAction(err));
  }
}

function* updateQA({ payload }: UpdateQAAction) {
  const updatedQA: QA = yield call(updateQAApi, payload);
  yield put(
    updateQAAction({
      interviewRoundId: payload.interviewRoundId,
      updatedQA,
    })
  );
}

/**
 * `takeEvery` allows multiple fetchData instances to be started concurrently
 * `takeLatest` allows only one fetchData task to run at any moment. And it will be the latest started task.
 * If a previous task is still running when another fetchData task is started,
 * the previous task will be automatically cancelled.
 *
 * `takeLatest` typically can be used for data fetch without specific id
 * `takeEvery` typically can be used for data fetch with specific id, or posting new data, etc.
 */
export function* interviewRoundSaga() {
  yield takeLatest(FETCH_INTERVIEW_ROUNDS_REQUEST, fetchInterviewRounds);
  yield takeEvery(UPDATE_INTERVIEW_ROUND_REQUEST, updateInterviewRound);
  yield takeEvery(FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST, fetchQAListByInterviewRoundId);
  yield takeEvery(ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST, addQuestionToInterviewRound);
  yield takeEvery(UPDATE_QA_REQUEST, updateQA);
}
