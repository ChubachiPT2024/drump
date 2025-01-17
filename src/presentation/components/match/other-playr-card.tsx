import { MatchOtherPlayerInfoPlayer } from "@/presentation/types/matchOtherPlayerInfoPlayer";
import { cn } from "@/presentation/shadcnUI/lib/utils";

export const OtherPlayerCard = ({
  player,
  position,
}: {
  player: MatchOtherPlayerInfoPlayer;
  position: "left" | "right";
}) => {
  return (
    <div
      className={cn(
        "bg-white border-transparent rounded-md shadow-md transition-all duration-300 ease-in-out hover:scale-110 px-4 py-1 transform-gpu border mb-4",
        position === "left" && "-left-2",
        position === "right" && "-right-2",
        player.hand.isBlackJack && "bg-yellow-50 border-yellow-300",
        player.hand.isBust && "bg-rose-50 border-rose-300"
      )}
    >
      <p
        className={cn(
          "font-bold text-xs truncate",
          player.hand.isBlackJack && "text-yellow-700",
          player.hand.isBust && "text-rose-700"
        )}
      >
        {player.name}
      </p>
      <div
        className={cn(
          "flex items-center gap-1 text-xs",
          player.hand.isBlackJack && "text-yellow-600",
          player.hand.isBust && "text-rose-600"
        )}
      >
        Hand:
        <span
          className={cn(
            "font-medium",
            player.hand.isBlackJack && "text-yellow-700",
            player.hand.isBust && "text-rose-700"
          )}
        >
          {player.hand.hardTotal}
        </span>
        {player.hand.softTotal && (
          <>
            <span className="text-gray-400">/</span>
            <span
              className={cn(
                "font-medium",
                player.hand.isBlackJack && "text-yellow-700",
                player.hand.isBust && "text-rose-700"
              )}
            >
              {player.hand.softTotal}
            </span>
          </>
        )}
      </div>
      <div className="flex gap-1">
        {player.hand.cards.map((card, index) => (
          <span
            key={`${card.rank}-${index}`}
            className={cn(
              "bg-gray-100 text-xs font-medium px-1 rounded",
              player.hand.isBlackJack && "bg-yellow-100 text-yellow-800",
              player.hand.isBust && "bg-rose-100 text-rose-800"
            )}
          >
            {card.rank}
          </span>
        ))}
      </div>
    </div>
  );
};
