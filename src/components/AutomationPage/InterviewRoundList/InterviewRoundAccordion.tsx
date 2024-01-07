import { FinalInterviewRound, InterviewRound } from "@/types/interviewRound";
import { FC, SyntheticEvent, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { QAListHash } from "@/types/qa";
import { useDispatch } from "react-redux";
import { fetchQAListByInterviewRoundIdRequest } from "@/store/sagas/interviewRoundSaga";
import { QAList } from "./QAList";
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import { SectionDivider } from "./SectionDivider";

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
  const [expanded, setExpanded] = useState(false);
  const disabled = data.status === "LOCKED";
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch QAList only when the accordion is expanded
    if (!qaListHash[data.id] && expanded) {
      dispatch(fetchQAListByInterviewRoundIdRequest(data.id));
    }
  }, [expanded, dispatch, qaListHash, data.id]);

  const handleChange = (_: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion disabled={disabled} expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {!!qaListHash[data.id] && (
          <QAList interviewRoundId={data.id} qaList={qaListHash[data.id]} />
        )}
        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddQuestion}>
          Add a Question
        </Button>
        <SectionDivider />
      </AccordionDetails>
    </Accordion>
  );
};
