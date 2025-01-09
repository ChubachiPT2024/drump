import axios from "axios";

export const userCreate = async (name: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users`,
      { name },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    
    return response.data.id;
  }
  catch (error) {
    console.error(error);
    return Promise.reject();
  }
};
