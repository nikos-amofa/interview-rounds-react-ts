import { InterviewRoundsProcessPage } from "./components/InterviewRoundsProcessPage";
import Button from "@mui/material/Button";
import { resetLocalStorage } from "./apiService/localStorage";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box>
      <Button onClick={resetLocalStorage}>Reset LocalStorage</Button>
      <InterviewRoundsProcessPage />
    </Box>
  );
}

export default App;
