import axios from "axios";
import { RoundResult } from "../../types/roundResult";

export const getRoundResultApi = async (
  matchId: string
): Promise<RoundResult> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/round-result`
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
