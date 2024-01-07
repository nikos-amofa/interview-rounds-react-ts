import { CANDIDATE_KEY_NAME, CANDIDATE } from "./constants/candidate";
import { ROLE_LIST_KEY_NAME, ROLE_LIST } from "./constants/role";

export const resetLocalStorage = () => {
  localStorage.setItem(CANDIDATE_KEY_NAME, JSON.stringify(CANDIDATE));
  localStorage.setItem(ROLE_LIST_KEY_NAME, JSON.stringify(ROLE_LIST));
};
