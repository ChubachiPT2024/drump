import axios from "axios";

export const postMatchCreateApi = async (
  userId: string
): Promise<{ id: string }> => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/matches`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
