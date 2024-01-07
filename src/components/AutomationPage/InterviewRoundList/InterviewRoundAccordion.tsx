import { FinalInterviewRound, InterviewRound } from "@/types/interviewRound";
import { FC } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";

interface InterviewRoundAccordionProps {
  data: InterviewRound | FinalInterviewRound;
}

export const InterviewRoundAccordion: FC<InterviewRoundAccordionProps> = ({ data }) => {
  const disabled = data.status === "LOCKED";

  return (
    <Accordion disabled={disabled}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>coming soon...</AccordionDetails>
    </Accordion>
  );
};
