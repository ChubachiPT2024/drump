import axios from "axios";

export const postHitApi = async (roundId: string): Promise<void> => {
  const apiUrl = "http://localhost:3000/api";

  try {
    await axios.post(`${apiUrl}/matches/${roundId}/hit`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};
