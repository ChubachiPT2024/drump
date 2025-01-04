import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronDown, ChevronRight } from "lucide-react";

import { userGetAll } from "../hooks/api/userGetAll";

import { Header } from "../components/share/header";
import { StartGameButton } from "../components/match-start/game-start-button";
import { UserList } from "../components/match-start/user-list";

import { cn } from "../shadcnUI/lib/utils";

import { User } from "../types/user";

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

  const postMatchStartApi = async (matchId: string): Promise<string> => {
    return axios
      .post(
        `${apiUrl}/matches/${matchId}/start-round`,
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

  const postMatchCreateApi = async (userId: string): Promise<string> => {
    return axios
      .post(
        `${apiUrl}/matches`,
        {
          userId: userId,
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

  const handleStartMatch = async (userId: string) => {
    const matchId = await postMatchCreateApi(userId);
    await postMatchStartApi(matchId);

    navigate(`/match/${matchId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const users = await userGetAll();
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
        <div className="flex flex-col md:flex-row justify-between items-center min-h-screen WhiteDot pt-20 gap-y-3 p-8">
          <div className="w-[80vw] md:w-5/12">
            <UserList
              title="Registered Users"
              users={registeredUsers}
              onUserAction={handleAddSelectedUser}
              actionLabel="Add"
              emptyMessage="No registered users available."
              isLoading={isLoading}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:w-2/12">
            <ChevronDown
              size={56}
              className={cn(
                "text-gray-400 md:hidden",
                selectedUsers.length !== 0 && "text-green-400"
              )}
            />
            <ChevronRight
              size={56}
              className={cn(
                "text-gray-400 hidden md:block",
                selectedUsers.length !== 0 && "text-green-400"
              )}
            />
            <StartGameButton
              selectedPlayers={selectedUsers}
              onClick={handleStartMatch}
              disabled={selectedUsers.length === 0}
            />
          </div>
          <div className="w-[80vw] md:w-5/12">
            <UserList
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
