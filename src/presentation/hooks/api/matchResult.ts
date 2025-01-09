import axios from "axios";

import { MatchResult } from "@/presentation/types/matchResult";

export const getResultApi = async (
  matchId: string
): Promise<MatchResult> => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/matches/${matchId}/result`
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
