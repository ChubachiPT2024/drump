import axios from "axios";

export const postMatchCreateApi = async (userId: number): Promise<string> => {
  return axios
    .post(
      `${import.meta.env.VITE_API_URL}/matches`,
      {
        userId: userId,
      },
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
