import { cn } from "@/presentation/shadcnUI/lib/utils";
import Avatar, { genConfig } from "react-nice-avatar";

// TODO: ドメインに合わせて、プレイヤーの型を参照する
interface PlayerResultCardProps {
  player: Player;
  outcome: string;
  credit: number;
}

export const PlayerResultCard = ({
  player,
  outcome,
  credit,
}: PlayerResultCardProps) => {
  const config = genConfig(player.name);

  return (
    <>
      <div
        className={cn(
          "py-2 px-4 rounded-md flex flex-row items-center border border-slate-300",
          outcome === "win" && "bg-green-200 border-none",
          outcome === "loss" && "bg-red-200 border-none"
        )}
      >
        <Avatar
          className="hidden sm:block size-10 md:size-16 mr-2"
          {...config}
        />
        <div className="w-full xl:flex">
          <div
            className="text-black text-lg text-center items-start w-full xl:w-1/3 truncate max-w-[8rem] md:max-w-[12rem] lg:max-w-[20rem]"
            title={player.name}
          >
            {player.name}
          </div>
          <div
            className={cn(
              "flex flex-row items-end justify-around xl:w-2/3",
              outcome === "win" && "text-green-500",
              outcome === "loss" && "text-red-500"
            )}
          >
            <div className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
              {outcome}
            </div>
            {/* LATER: クレジットの増減をカウントアップダウンでアニメーション表示する */}
            <div className="text-base md:text-lg lg:text-xl">
              Credit: {credit}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
