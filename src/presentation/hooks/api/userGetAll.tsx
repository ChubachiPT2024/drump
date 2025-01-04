import axios from "axios";

import { User } from "../../types/user";

// TODO: move to .env
const apiUrl = "http://localhost:3000/api";

export const userGetAll = async (): Promise<User[]> => {
  const response = await axios.get(`${apiUrl}/users/all`);
  return response.data.users;
};
