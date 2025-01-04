import axios from "axios";
import { ResultSummary } from "../../types/resultSummary";

export const getMatchResultSummaryApi = async (
  matchId: string
): Promise<ResultSummary> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/summary`
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
