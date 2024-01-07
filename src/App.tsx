import { AutomationPage } from "./components/AutomationPage";
import Button from "@/components/common/Button";
import { resetLocalStorage } from "./apiService/resetLocalStorage";
import Box from "@/components/common/Box";

function App() {
  return (
    <Box>
      <Button onClick={resetLocalStorage} sx={{}}>
        Reset LocalStorage
      </Button>
      <AutomationPage />
    </Box>
  );
}

export default App;
