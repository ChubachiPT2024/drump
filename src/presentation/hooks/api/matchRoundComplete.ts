import axios from "axios";

export const postRoundCompleteApi = async (matchId: string): Promise<void> => {
  const apiUrl = "http://localhost:3000/api";
  try {
    await axios.post(
      `${apiUrl}/matches/${matchId}/complete-round`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
