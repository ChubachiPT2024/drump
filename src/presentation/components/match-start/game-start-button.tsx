import { Button } from "@/presentation/shadcnUI/components/ui/button";

import { cn } from "@/presentation/shadcnUI/lib/utils";

interface StartGameButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const StartGameButton = ({
  disabled,
  onClick,
}: StartGameButtonProps) => {
  return (
    <>
      <div className="mt-6 fixed bottom-1 z-10">
        <div
          className={cn(
            "border-2 border-yellow-500 rounded-md",
            !disabled && "animate-bounce"
          )}
        >
          <Button
            onClick={onClick}
            size="lg"
            variant={disabled ? "locked" : "success"}
            disabled={disabled}
            className="uppercase"
          >
            Game Start
          </Button>
        </div>
      </div>
    </>
  );
};
