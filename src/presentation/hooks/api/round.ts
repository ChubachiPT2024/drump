import axios from "axios";
import { HandSignalOptions } from "../../types/handSignalOptions";
import { PlayerHand } from "../../types/playerHand";
import { MatchGetPlayerHandApiResponseCard } from "../../types/matchGetPlayerHandApiResponseCard";

// TODO: move to .env
const apiUrl = "http://localhost:3000/api";

export const getHandSignalOptionsApi = async (
  roundId: string
): Promise<HandSignalOptions> => {
  try {
    const res = await axios.get(
      `${apiUrl}/rounds/${roundId}/hand-signal-options`
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const postStandApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/rounds/${roundId}/stand`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};

export const postHitApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/rounds/${roundId}/hit`, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getDealersHandApi = async (
  roundId: string
): Promise<PlayerHand> => {
  try {
    const res = await axios.get(`${apiUrl}/rounds/${roundId}/dealers-hand`);

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const postRoundCompleteApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(
      `${apiUrl}/rounds/${roundId}/complete`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const postRoundStartApi = async (roundId: string): Promise<void> => {
  try {
    await axios.post(
      `${apiUrl}/rounds/${roundId}/start`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
  }
};

export const getUpCardApi = async (
  roundId: string
): Promise<MatchGetPlayerHandApiResponseCard> => {
  try {
    const res = await axios.get(`${apiUrl}/rounds/${roundId}/up-card`);

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};

export const getPlayersHandApi = async (
  roundId: string
): Promise<PlayerHand> => {
  try {
    const res = await axios.get(`${apiUrl}/rounds/${roundId}/players-hand`);

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject();
  }
};
