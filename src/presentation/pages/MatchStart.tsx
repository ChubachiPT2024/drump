import { Button } from "../shadcnUI/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MatchStartPage = () => {
  const navigate = useNavigate();
  // TODO:URLを環境変数から取得する
  const apiUrl = "http://localhost:3000/api/shoes";

  const postShoeApi = async (): Promise<string> => {
    return axios
      .post(
        apiUrl,
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
        apiUrl,
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

    navigate(`/match/${matchId}`);
  };

  return (
    <div>
      <Button onClick={handleClick} className="m-5">
        Match Start
      </Button>
    </div>
  );
};
