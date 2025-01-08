import axios from "axios";

import { User } from "../../types/user";

export const userGetAll = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/all`);
    return response.data.users;
  }
  catch (error) {
    console.error(error);
    return Promise.reject();
  }
};
