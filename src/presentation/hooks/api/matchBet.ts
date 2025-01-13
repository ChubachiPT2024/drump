import axios from "axios";

export const postMatchBetApi = async (
  matchId: string,
  playerId: string,
  amount: number
): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/players/${playerId}/bet`,
      { amount },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
