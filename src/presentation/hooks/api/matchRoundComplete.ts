import axios from "axios";

export const postRoundCompleteApi = async (matchId: string): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/complete-round`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
