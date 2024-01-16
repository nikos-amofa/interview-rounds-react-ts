import { InterviewRoundsProcessPage } from "./components/InterviewRoundsProcessPage";
import Button from "@mui/material/Button";
import { isEmptyLocalStorage, resetLocalStorage } from "./apiService/localStorage";
import Box from "@mui/material/Box";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (isEmptyLocalStorage()) {
      resetLocalStorage();
      window.location.reload();
    }
  }, []);

  return (
    <Box>
      <Button onClick={resetLocalStorage}>Reset LocalStorage</Button>
      <InterviewRoundsProcessPage />
    </Box>
  );
}

export default App;
