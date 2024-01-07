import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { fetchRoleListRequest } from "@/store/sagas/roleSaga";
import { fetchCandidateDataRequest } from "@/store/sagas/candidateSaga";

export const AutomationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoleListRequest());
    dispatch(fetchCandidateDataRequest());
  }, []);

  return (
    <>
      <Header />
    </>
  );
};
