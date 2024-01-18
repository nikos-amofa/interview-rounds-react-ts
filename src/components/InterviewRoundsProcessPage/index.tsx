import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { fetchRoleListRequest } from "@/store/actions/role.action";
import { fetchCandidateDataRequest } from "@/store/actions/candidate.action";
import { fetchInterviewRoundsRequest } from "@/store/actions/interviewRound.action";
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
