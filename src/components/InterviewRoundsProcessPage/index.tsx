import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { fetchRoleListRequest } from "@/store/sagas/roleSaga";
import { fetchCandidateDataRequest } from "@/store/sagas/candidateSaga";
import { fetchInterviewRoundsRequest } from "@/store/sagas/interviewRoundSaga";
import { Container } from "@mui/material";
import { InterviewRoundList } from "./InterviewRoundList";

export const InterviewRoundsProcessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoleListRequest());
    dispatch(fetchCandidateDataRequest());
    dispatch(fetchInterviewRoundsRequest());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <InterviewRoundList />
      </Container>
    </>
  );
};
