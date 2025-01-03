import axios from "axios";

export const postMatchCreateApi = async (userId: number): Promise<string> => {
  const apiUrl = "http://localhost:3000/api";
  return axios
    .post(
      `${apiUrl}/matches`,
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
