import axios from "axios";
import { ResultSummary } from "../../../types";

export const getMatchResultSummaryApi = async (
  matchId: string
): Promise<ResultSummary> => {
  const apiUrl = "http://localhost:3000/api";

  try {
    const res = await axios.get(`${apiUrl}/matches/${matchId}/summary`);

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
