import axios from "axios";

// TODO: move to .env
const apiUrl = "http://localhost:3000/api";

export const postAddRoundApi = async (
  matchId: string,
  roundId: string
): Promise<void> => {
  try {
    await axios.post(
      `${apiUrl}/matches/${matchId}/add-round`,
      { roundId },
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};
