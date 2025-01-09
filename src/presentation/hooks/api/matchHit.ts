import axios from "axios";

export const postHitApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/matches/${roundId}/hit`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};
