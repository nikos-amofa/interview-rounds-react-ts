import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { FETCH_ROLE_LIST_REQUEST } from "@/store/sagas/roleSaga";
import { RootState } from "@/store";

function App() {
  const dispatch = useDispatch();
  const { roleList } = useSelector((state: RootState) => state.role);

  useEffect(() => {
    dispatch({ type: FETCH_ROLE_LIST_REQUEST });
  }, []);

  console.log("roleList", roleList);

  return <></>;
}

export default App;
