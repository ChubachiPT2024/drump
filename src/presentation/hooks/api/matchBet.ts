import axios from "axios";

export const postMatchBetApi = async (
  matchId: string,
  amount: number
): Promise<void> => {
  const apiUrl = "http://localhost:3000/api";
  try {
    await axios.post(
      `${apiUrl}/matches/${matchId}/bet`,
      { amount },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
