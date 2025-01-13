import axios from "axios";

import { playerName } from "@/presentation/types/matchPlayerName";

export const getPlayersNameApi = async (
  matchId: string
): Promise<playerName[]> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/players-names`
    );

    return res.data.players;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
