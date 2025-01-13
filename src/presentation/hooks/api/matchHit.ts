import axios from "axios";

export const postHitApi = async (matchId: string, playerId: string): Promise<void> => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/matches/${matchId}/players/${playerId}/hit`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};
