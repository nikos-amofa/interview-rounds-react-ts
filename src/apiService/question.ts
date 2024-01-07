import { QUESTION_LIST_KEY_NAME } from "./localStorage/question";

export const fetchQuestionSearchResultsFromApi = (keyword: string): string[] => {
  const searchTerm = keyword.toLowerCase();
  const data = localStorage.getItem(QUESTION_LIST_KEY_NAME);
  const list = data ? (JSON.parse(data) as string[]) : [];
  return list.filter((v) => v.toLowerCase().includes(searchTerm));
};
