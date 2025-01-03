import axios from "axios";

export const postStandApi = async (roundId: string): Promise<void> => {
  const apiUrl = "http://localhost:3000/api";

  try {
    await axios.post(`${apiUrl}/matches/${roundId}/stand`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};
