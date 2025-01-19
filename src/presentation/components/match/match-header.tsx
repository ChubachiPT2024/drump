import { CircleHelp } from "lucide-react";

import { Logo } from "../share/logo";
import { HelpButton } from "./help-button";
import { HintToggle } from "./hint-toggle";

import { MATCH_CONSTANTS } from "../../constants/match";

interface MatchHeaderProps {
  roundCount: number;
  isHintEnabled: boolean;
  setIsHintEnabled: (isHintEnabled: boolean) => void;
  handleRule: () => void;
}

export const MatchHeader = ({
  roundCount,
  isHintEnabled,
  setIsHintEnabled,
  handleRule,
}: MatchHeaderProps) => {
  return (
    <>
      <div className="absolute top-4 left-4 text-center space-y-2">
        <div className="flex">
          <div className="mr-2">
            <div className="flex">
              <div className="hidden md:block items-center bg-neutral-950/10 rounded-md">
                <Logo size={32} />
              </div>
              <HelpButton icon={CircleHelp} size={8} onClick={handleRule} />
              <HintToggle
                isHintEnabled={isHintEnabled}
                onClick={() => setIsHintEnabled(!isHintEnabled)}
                className="ml-2"
                text="Hint"
              />
            </div>

            <div className="bg-white rounded-full px-2 border-yellow-500 border-2 ">
              <p className="text-base text-black font-semibold">
                Round {roundCount} / {MATCH_CONSTANTS.MAX_ROUND_COUNT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
