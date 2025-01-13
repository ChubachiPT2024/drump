import axios from "axios";

export const postStandApi = async (matchId: string, playerId: string): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/players/${playerId}/stand`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
