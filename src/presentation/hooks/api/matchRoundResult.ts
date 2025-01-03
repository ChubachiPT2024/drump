import axios from "axios";
import { RoundResult } from "../../types/roundResult";

export const getRoundResultApi = async (
  matchId: string
): Promise<RoundResult> => {
  const apiUrl = "http://localhost:3000/api";
  try {
    const res = await axios.get(`${apiUrl}/matches/${matchId}/round-result`);

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
