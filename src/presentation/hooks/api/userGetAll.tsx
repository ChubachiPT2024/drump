import axios from "axios";

import { User } from "../../types/user";

export const userGetAll = async (): Promise<User[]> => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
  return response.data.users;
};
