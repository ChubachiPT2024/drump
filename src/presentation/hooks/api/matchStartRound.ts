import axios from "axios";

export const postMatchStartApi = async (matchId: string): Promise<void> => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/start-round`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
