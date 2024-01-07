import { CANDIDATE_KEY_NAME, CANDIDATE } from "./candidate";
import { INTERVIEW_ROUNDS_KEY_NAME, INTERVIEW_ROUNDS } from "./interviewRound";
import { QUESTION_LIST_KEY_NAME, QUESTION_LIST } from "./question";
import { ROLE_LIST_KEY_NAME, ROLE_LIST } from "./role";

export const resetLocalStorage = () => {
  localStorage.clear();
  localStorage.setItem(CANDIDATE_KEY_NAME, JSON.stringify(CANDIDATE));
  localStorage.setItem(INTERVIEW_ROUNDS_KEY_NAME, JSON.stringify(INTERVIEW_ROUNDS));
  localStorage.setItem(QUESTION_LIST_KEY_NAME, JSON.stringify(QUESTION_LIST));
  localStorage.setItem(ROLE_LIST_KEY_NAME, JSON.stringify(ROLE_LIST));
};
