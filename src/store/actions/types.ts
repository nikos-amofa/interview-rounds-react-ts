/**
 * There should be no duplicates among the action types
 * Storing them in one file is the best option
 * Constant strings are used instead of enum to get benefit of tree shaking while building to reduce the bundle size
 */

// candidate
export const FETCH_CANDIDATE_DATA_REQUEST = "FETCH_CANDIDATE_DATA_REQUEST";

// interview round
export const FETCH_INTERVIEW_ROUNDS_REQUEST = "FETCH_INTERVIEW_ROUNDS_REQUEST";
export const UPDATE_INTERVIEW_ROUND_REQUEST = "UPDATE_INTERVIEW_ROUND_REQUEST";
export const FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST =
  "FETCH_QA_LIST_BY_INTERVIEW_ROUND_ID_REQUEST";
export const ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST = "ADD_QUESTION_TO_INTERVIEW_ROUND_REQUEST";
export const UPDATE_QA_REQUEST = "UPDATE_QA_REQUEST";

// role
export const FETCH_ROLE_LIST_REQUEST = "FETCH_ROLE_LIST_REQUEST";
