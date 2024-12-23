import { Button } from "../shadcnUI/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MatchStartPage = () => {
  const navigate = useNavigate();
  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const postShoeApi = async (): Promise<string> => {
    return axios
      .post(
        `${apiUrl}/shoes`,
        {},
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

  const postMatchApi = async (shoeId: string): Promise<string> => {
    return axios
      .post(
        `${apiUrl}/matches`,
        {
          shoeId: shoeId,
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

  const postRoundApi = async (shoeId: string): Promise<string> => {
    return axios
      .post(
        apiUrl + "/rounds",
        {
          shoeId: shoeId,
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

  const handleClick = async () => {
    const shoeId = await postShoeApi();
    const matchId = await postMatchApi(shoeId);
    const roundId = await postRoundApi(shoeId);

    navigate(`/match/${matchId}`, { state: { roundId: roundId } });
  };

  return (
    <div>
      <Button onClick={handleClick} className="m-5">
        Match Start
      </Button>
    </div>
  );
};
