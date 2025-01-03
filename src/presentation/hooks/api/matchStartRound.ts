import axios from "axios";

export const postMatchStartApi = async (matchId: string): Promise<string> => {
  return axios
    .post(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/start-round`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      return res.data.id;
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
};
