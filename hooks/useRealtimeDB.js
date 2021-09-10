import { useContext } from "react";
import RealtimeDBContext from "../contexts/RealtimeDBContext";

const useRealTimeDB = () => useContext(RealtimeDBContext);

export default useRealTimeDB;