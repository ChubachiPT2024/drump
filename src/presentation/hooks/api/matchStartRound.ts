import axios from "axios";

export const postMatchStartApi = async (matchId: string): Promise<string> => {
  const apiUrl = "http://localhost:3000/api";

  return axios
    .post(
      `${apiUrl}/matches/${matchId}/start-round`,
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
