import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlayerCard } from "../components/match-start/player-card";
import { Header } from "../components/share/header";

import { Button } from "../shadcnUI/components/ui/button";
import { ScrollArea } from "../shadcnUI/components/ui/scroll-area";

import { cn } from "../shadcnUI/lib/utils";
import { postMatchStartApi } from "../hooks/api/matchStartRound";
import { postMatchCreateApi } from "../hooks/api/matchCreate";

export const MatchStartPage = () => {
  const navigate = useNavigate();

  // TODO: ドメインに合わせて、プレイヤーの型を参照する
  const [selectedPlayers, setSelectedPlayers] = useState([
    { id: 1, name: "Chris Johnson" },
    { id: 2, name: "Laura Smith" },
  ]);

  // TODO: ドメインに合わせて、プレイヤーの型を参照する
  const [registeredPlayers, setRegisteredPlayers] = useState([
    { id: 3, name: "若松 隼也" },
    { id: 4, name: "さき" },
    { id: 5, name: "はなこ" },
    { id: 6, name: "桜" },
    { id: 7, name: "Charlie Brown" },
    { id: 8, name: "David Johnson" },
    { id: 9, name: "Eve Smith" },
    { id: 10, name: "Frank Brown" },
    { id: 11, name: "Grace Johnson" },
    { id: 12, name: "Harry Smith" },
    { id: 13, name: "Ivy Brown" },
    { id: 14, name: "Jack Johnson" },
    { id: 15, name: "Kelly Smith" },
    { id: 16, name: "Larry Brown" },
    { id: 17, name: "Mary Johnson" },
    { id: 18, name: "Nancy Smith" },
  ]);

  // TODO: ドメインに合わせて、プレイヤーの型を参照する
  const handleAddSelectedPlayer = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
    setRegisteredPlayers(registeredPlayers.filter((p) => p.id !== player.id));
  };

  // TODO: ドメインに合わせて、プレイヤーの型を参照する
  const handleRemoveSelectedPlayer = (player) => {
    setRegisteredPlayers([...registeredPlayers, player]);
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
  };

  // TODO: プレイヤーが設定されていなければ、ボタンを無効にする
  const handleStartMatch = async (userId: number) => {
    const matchCreate = await postMatchCreateApi(userId);
    await postMatchStartApi(matchCreate.id);

    navigate(`/match/${matchCreate.id}`);
  };

  useEffect(() => {
    // TODO: プレイヤーの一覧を取得する関数を実装
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-screen WhiteDot pt-16">
          <div className="w-[70%] mt-2 mb-3 pt-2 p-4 bg-gradient-to-br from-green-400 via-green-500 to-green-400 rounded-xl border-2 border-neutral-300">
            <h2 className="text-xl font-bold text-black">
              Selected Players List
            </h2>
            <ScrollArea className="h-[200px]">
              <div className="flex flex-wrap gap-4 mt-4">
                {selectedPlayers.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No players selected. Please add players to start the game.
                  </p>
                ) : (
                  selectedPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onAction={handleRemoveSelectedPlayer}
                      actionLabel="Remove"
                      variant="danger"
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="w-[70%] mt-2 mb-12 pt-2 p-4 bg-gradient-to-br from-neutral-100 via-neutral-300 to-neutral-100 rounded-xl border-2 border-neutral-300">
            <h2 className="text-xl font-bold text-black">
              Registered Players List
            </h2>
            <ScrollArea className="h-[200px]">
              <div className="flex flex-wrap gap-4 mt-4">
                {registeredPlayers.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No registered players available.
                  </p>
                ) : (
                  registeredPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onAction={handleAddSelectedPlayer}
                      actionLabel="Add"
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="mt-6 fixed bottom-1 ">
            <div
              className={cn(
                "border-2 border-yellow-500 rounded-md",
                selectedPlayers.length !== 0 && "animate-bounce"
              )}
            >
              <Button
                onClick={() => handleStartMatch(selectedPlayers[0].id)} // TODO: 複数人プレー時に変更
                size="lg"
                variant={selectedPlayers.length === 0 ? "locked" : "success"}
                disabled={selectedPlayers.length === 0}
                className="uppercase"
              >
                Game Start
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
