import axios from "axios";

export const postStandApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${roundId}/stand`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
  }
};
