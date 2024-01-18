import { QA } from "@/types/qa";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { updateQARequest } from "@/store/actions/interviewRound.action";

const ContainerPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(2),
}));

interface QAPaperProps {
  interviewRoundId: number;
  qa: QA;
}

export const QAPaper: FC<QAPaperProps> = ({ interviewRoundId, qa }) => {
  const interviewerFullName = `${qa.interviewer.firstName} ${qa.interviewer.lastName}`;
  const [answer, setAnswer] = useState(qa.answer);
  const dispatch = useDispatch();

  const saveAnswer = () => {
    dispatch(
      updateQARequest({
        interviewRoundId,
        qaId: qa.id,
        answer,
      })
    );
  };

  return (
    <ContainerPaper elevation={2}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <Avatar
          alt={interviewerFullName}
          src={qa.interviewer.avatarUrl ?? ""}
          sx={{ marginRight: "10px" }}
        />
        <Typography sx={{ marginRight: "10px" }}>{qa.question}</Typography>
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error">
          <DeleteIcon />
        </IconButton>
        <Button onClick={saveAnswer} startIcon={<SaveIcon />} variant="outlined">
          Save Answer
        </Button>
      </Box>
      <TextField
        multiline
        variant="outlined"
        fullWidth
        placeholder="Candidate's answer or your feedback"
        minRows={2}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
    </ContainerPaper>
  );
};
