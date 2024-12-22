import Avatar, { genConfig } from "react-nice-avatar";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

// TODO: ドメインに合わせて、プレイヤーの型を参照する
interface PlayerCardProps {
  player: Player;
  onAction: (player: Player) => void;
  actionLabel: string;
  variant?: "danger";
}

export const PlayerCard = ({
  player,
  onAction,
  actionLabel,
  variant,
}: PlayerCardProps) => {
  const config = genConfig(player.name);
  return (
    <div className="flex flex-row sm:flex-col justify-between items-center bg-white p-2 rounded-md w-full sm:w-[220px] gap-y-1 gap-x-1">
      <Avatar className="size-10 md:size-16" {...config} />
      <p>{player.name}</p>
      <Button
        size="sm"
        variant={variant}
        className="uppercase"
        onClick={() => onAction(player)}
      >
        {actionLabel}
      </Button>
    </div>
  );
};
