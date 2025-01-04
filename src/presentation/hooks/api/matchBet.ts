import axios from "axios";

export const postMatchBetApi = async (
  matchId: string,
  amount: number
): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/bet`,
      { amount },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
