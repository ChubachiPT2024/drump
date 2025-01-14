import axios from "axios";
import { MatchHint } from "../../types/matchHint";

export const getMatchHintApi = async (
  matchId: string,
  playerId: string
): Promise<MatchHint> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/players/${playerId}/hint`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
