import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { userApi } from "../api/user/userCreateApi";

import { UserCard } from "../components/match-start/user-card";
import { Header } from "../components/share/header";

import { Button } from "../shadcnUI/components/ui/button";
import { ScrollArea } from "../shadcnUI/components/ui/scroll-area";

import { cn } from "../shadcnUI/lib/utils";

import { User } from "../types/User";
import { StartGameButton } from "../components/match-start/game-start-button";
import { UserList } from "../components/match-start/user-list";

export const MatchStartPage = () => {
  const navigate = useNavigate();

  // TODO: move to .env
  const apiUrl = "http://localhost:3000/api";

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleAddSelectedUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setRegisteredUsers(registeredUsers.filter((u: User) => u.id !== user.id));
  };

  const handleRemoveSelectedUser = (user: User) => {
    setRegisteredUsers([...registeredUsers, user]);
    setSelectedUsers(selectedUsers.filter((u: User) => u.id !== user.id));
  };

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

  const handleStartMatch = async () => {
    const shoeId = await postShoeApi();
    const matchId = await postMatchApi(shoeId);
    const roundId = await postRoundApi(shoeId);

    navigate(`/match/${matchId}`, { state: { roundId: roundId } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const users = await userApi.getAllUsers();
        setRegisteredUsers(users);
      } catch (err) {
        console.error(err);
        setRegisteredUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="flex w-full justify-between items-start min-h-screen WhiteDot pt-16 gap-4">
          <div className="w-5/12">
            <DemoUserList
              title="Registered Users"
              users={registeredUsers}
              onUserAction={handleAddSelectedUser}
              actionLabel="Add"
              emptyMessage="No registered users available."
              isLoading={false}
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-8 w-2/12 pt-32">
            <ChevronRight size={48} className="text-gray-400" />
            <button
              onClick={() => console.log("Game Start")}
              disabled={selectedUsers.length === 0}
              className={`px-6 py-3 rounded-lg font-medium uppercase ${
                selectedUsers.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              Game Start
            </button>
          </div>

          <div className="w-5/12">
            <DemoUserList
              title="Selected Users"
              users={selectedUsers}
              onUserAction={handleRemoveSelectedUser}
              actionLabel="Remove"
              variant="danger"
              emptyMessage="No users selected. Please add users to start the game."
            />
          </div>
        </div>
      </div>
    </>
  );
};
