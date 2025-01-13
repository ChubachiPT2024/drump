interface otherPlayerInfoProps {
  players: any[];
  playerTurnIndex: number;
}

export const OtherPlayerInfo = ({
  players,
  playerTurnIndex,
}: otherPlayerInfoProps) => {
  return (
    <>
      <div className="absolute w-full">
        {players.map((player, index) => {
          if (!player.isCurrent) {
            const positionClass =
              playerTurnIndex < index ? "left-4" : "right-4";

            const topOffset =
              playerTurnIndex < index
                ? (index - playerTurnIndex) *
                    (otherPlayersSpacingHeight /
                      (players.length - playerTurnIndex - 1)) +
                  150
                : (playerTurnIndex - index) *
                    (otherPlayersSpacingHeight / playerTurnIndex) +
                  150;

            return (
              <div
                key={player.id}
                style={{ top: `${topOffset}px` }}
                className={`absolute ${positionClass} bg-white rounded-md p-1 space-x-1 shadow-md w-[70px]`}
              >
                <p className="font-bold text-xs">{player.name}</p>
                <p className="text-xs">Hand: {player.hand}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};
