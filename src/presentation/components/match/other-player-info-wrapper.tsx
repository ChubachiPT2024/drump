import { useEffect, useState } from "react";
import { useMedia } from "react-use";

import { OtherPlayerCard } from "./other-playr-card";

import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";

import { MatchPhase } from "@/presentation/types/matchPhase";
import { MatchOtherPlayerInfoPlayer } from "@/presentation/types/matchOtherPlayerInfoPlayer";

interface OtherPlayerInfoProps {
  phase: MatchPhase;
  players: MatchOtherPlayerInfoPlayer[];
  playerTurnIndex: number;
}

export const OtherPlayerInfoWrapper = ({
  phase,
  players,
  playerTurnIndex,
}: OtherPlayerInfoProps) => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const isMobile = useMedia("(max-width: 1024px)", false);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (phase !== MatchPhase.PLAYER_TURNS) {
    return null;
  }

  const leftPlayers = players.slice(playerTurnIndex, players.length);
  const rightPlayers = players.slice(0, playerTurnIndex);

  // モバイルとデスクトップで異なる開始位置を設定
  const startPosition = isMobile ? 0.3 : 0.5;
  const scrollAreaStyle = {
    top: `${windowHeight * startPosition}px`,
  };

  return (
    <div className="absolute w-full h-full -z-10">
      <div className="absolute left-0" style={scrollAreaStyle}>
        <ScrollArea className="h-[35vh] rounded-md" type="hover">
          <div className="px-1 py-4">
            {leftPlayers.map((player) => (
              <OtherPlayerCard
                key={player.id}
                player={player}
                position="left"
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="absolute right-0" style={scrollAreaStyle}>
        <ScrollArea className="h-[35vh] rounded-md" type="hover">
          <div className="px-1 py-4">
            {rightPlayers.map((player) => (
              <OtherPlayerCard
                key={player.id}
                player={player}
                position="right"
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
