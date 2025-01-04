import axios from "axios";

// TODO: move to .env
const apiUrl = "http://localhost:3000/api";

export const userCreate = async (name: string): Promise<string> => {
  const response = await axios.post(
    `${apiUrl}/users`,
    { name },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.id;
};
