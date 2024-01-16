import { FinalInterviewRound, InterviewRound, isInterviewRoundFinal } from "@/types/interviewRound";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { QAListHash } from "@/types/qa";
import { useDispatch } from "react-redux";
import {
  fetchQAListByInterviewRoundIdRequest,
  updateInterviewRoundRequest,
} from "@/store/sagas/interviewRoundSaga";
import { QAList } from "./QAList";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { SectionDivider } from "../SectionDivider";
import { RoleSelector } from "./RoleSelector";
import { makeSelectedRoleIds, timeAgoFormatter } from "./helpers";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface InterviewRoundAccordionProps {
  data: InterviewRound | FinalInterviewRound;
  qaListHash: QAListHash;
  onAddQuestion: () => void;
}

export const InterviewRoundAccordion: FC<InterviewRoundAccordionProps> = ({
  data,
  qaListHash,
  onAddQuestion,
}) => {
  const isFinalRound = isInterviewRoundFinal(data);
  const [expanded, setExpanded] = useState(false);
  const interviewRoundLocked = data.status === "LOCKED";
  const interviewRoundUnlocked = data.status === "UNLOCKED";
  const dispatch = useDispatch();
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>(makeSelectedRoleIds(data));
  const [timeAgo, setTimeAgo] = useState<null | string>(null);

  useEffect(() => {
    const handler = setInterval(() => {
      if (data.statusUpdatedAt) {
        setTimeAgo(timeAgoFormatter(new Date(data.statusUpdatedAt).getTime()));
      } else {
        setTimeAgo(null);
      }
    }, 1000);

    return () => {
      clearInterval(handler);
    };
  }, [data.statusUpdatedAt]);

  useEffect(() => {
    // fetch QAList only when the accordion is expanded
    if (!qaListHash[data.id] && expanded) {
      dispatch(fetchQAListByInterviewRoundIdRequest(data.id));
    }
  }, [expanded, dispatch, qaListHash, data.id]);

  const handleChange = (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handlePassClick = () => {
    dispatch(
      updateInterviewRoundRequest({
        id: data.id,
        status: "PASSED",
        ...(isFinalRound
          ? { finalRoleId: selectedRoleIds[0] }
          : { fittingRoleIds: selectedRoleIds }),
      })
    );
  };

  const handleFailClick = () => {
    dispatch(
      updateInterviewRoundRequest({
        id: data.id,
        status: "FAILED",
      })
    );
  };

  return (
    <Accordion disabled={interviewRoundLocked} expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" color="primary">
            {data.title}
          </Typography>
          {data.status === "PASSED" && <CheckCircleOutlineIcon color="success" fontSize="large" />}
          {data.status === "FAILED" && <HighlightOffIcon color="error" fontSize="large" />}
          {timeAgo}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography variant="h6">Questions and Answers</Typography>
          <Box sx={{ paddingLeft: 3 }}>
            {!!qaListHash[data.id] && (
              <QAList interviewRoundId={data.id} qaList={qaListHash[data.id]} />
            )}
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={onAddQuestion}
              sx={{ marginTop: 2 }}
            >
              Add a Question
            </Button>
          </Box>
        </Box>
        <SectionDivider />
        <RoleSelector
          isFinalRound={isFinalRound}
          value={selectedRoleIds}
          onChange={(v) => setSelectedRoleIds(v)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
          <Button
            variant="contained"
            disabled={!interviewRoundUnlocked || !selectedRoleIds.length}
            onClick={handlePassClick}
          >
            Pass
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={!interviewRoundUnlocked}
            onClick={handleFailClick}
          >
            Fail
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
