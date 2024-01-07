import { Role } from "@/types/role";
import { ROLE_LIST_KEY_NAME } from "./localStorage/role";

export const fetchRoleListFromApi = () => {
  const data = localStorage.getItem(ROLE_LIST_KEY_NAME);
  // TODO: throw error if data is empty
  return data ? (JSON.parse(data) as Role[]) : null;
};
