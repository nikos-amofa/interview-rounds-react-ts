import { Candidate } from "@/types/candidate";
import { CANDIDATE_KEY_NAME } from "./constants/candidate";

export const fetchCandidateFromApi = () => {
  const data = localStorage.getItem(CANDIDATE_KEY_NAME);
  // TODO: throw error if data is empty
  return data ? (JSON.parse(data) as Candidate) : null;
};
