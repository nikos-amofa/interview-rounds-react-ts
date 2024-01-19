import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header } from "./Header";
import { fetchRoleListRequest } from "@/store/actions/role.action";
import { fetchCandidateDataRequest } from "@/store/actions/candidate.action";
import { fetchInterviewRoundsRequest } from "@/store/actions/interviewRound.action";
import { Container } from "@mui/material";
import { InterviewRoundList } from "./InterviewRoundList";
import { SHORT_PERIOD_REQUEST } from "@/store/actions/types";

export const InterviewRoundsProcessPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SHORT_PERIOD_REQUEST, payload: 1 });
    dispatch({ type: SHORT_PERIOD_REQUEST, payload: 2 });
    dispatch({ type: SHORT_PERIOD_REQUEST, payload: 3 });
    dispatch({ type: SHORT_PERIOD_REQUEST, payload: 4 });
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
