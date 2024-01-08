import { fetchQuestionSearchResultsFromApi } from "@/apiService/question";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SectionDivider } from "./SectionDivider";

interface AddQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onAddQuestion: (q: string) => void;
}

export const AddQuestionModal: FC<AddQuestionModalProps> = ({ open, onClose, onAddQuestion }) => {
  const [customQuestion, setCustomQuestion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const [questions, setQuestions] = useState<string[]>([]);

  useEffect(() => {
    // skipped redux
    setQuestions(fetchQuestionSearchResultsFromApi(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const addQuestion = (q: string) => () => {
    onAddQuestion(q);
    setCustomQuestion("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Question</DialogTitle>

      <DialogContent>
        <DialogContentText>Select a Question</DialogContentText>
        <TextField
          margin="dense"
          label="Type to search question"
          type="text"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Box sx={{ height: "300px", overflow: "scroll" }}>
          {questions.map((q) => (
            <Button
              key={q}
              fullWidth
              variant="outlined"
              onClick={addQuestion(q)}
              sx={{ textAlign: "left", textTransform: "none" }}
            >
              {q}
            </Button>
          ))}
        </Box>
        <SectionDivider />
        <DialogContentText>Your Custom Question</DialogContentText>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 70px", alignItems: "baseline" }}>
          <TextField
            margin="dense"
            label="Custom Question"
            type="text"
            fullWidth
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
          />
          <Button
            disabled={!customQuestion}
            variant="contained"
            onClick={addQuestion(customQuestion)}
            sx={{ height: "55px" }}
          >
            Add
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
