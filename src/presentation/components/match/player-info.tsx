import Avatar, { genConfig } from "react-nice-avatar";

interface PlayerInfoProps {
  playerName: string;
  credit: number;
}

export const PlayerInfo = ({ playerName, credit }: PlayerInfoProps) => {
  const avatarConfig = genConfig(playerName);

  return (
    <>
      <div
        id="playerInfo"
        className="bg-white rounded-lg flex justify-around py-2 mb-1 w-[30%]"
      >
        <Avatar className="hidden md:block size-8" {...avatarConfig} />
        <div className="flex justify-between items-center gap-x-4 ">
          <p className="text-center text-black font-semibold">{playerName}</p>
          <p className="text-center text-black font-semibold">
            Credit: {credit}
          </p>
        </div>
      </div>
    </>
  );
};
