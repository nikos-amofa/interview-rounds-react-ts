import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { fetchRoleListRequest } from "@/store/sagas/roleSaga";
import { fetchCandidateDataRequest } from "@/store/sagas/candidateSaga";
import { fetchInterviewRoundsRequest } from "@/store/sagas/interviewRoundSaga";
import { Container } from "@mui/material";
import { InterviewRoundList } from "./InterviewRoundList";

export const AutomationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoleListRequest());
    dispatch(fetchCandidateDataRequest());
    dispatch(fetchInterviewRoundsRequest());
  }, []);

  return (
    <>
      <Header />
      <Container>
        <InterviewRoundList />
      </Container>
    </>
  );
};
