import { Button } from "@/presentation/shadcnUI/components/ui/button";

import { cn } from "@/presentation/shadcnUI/lib/utils";

import { User } from "@/presentation/types/user";

interface StartGameButtonProps {
  selectedUsers: User[];
  disabled: boolean;
  onClick: (userIds: string[]) => void;
}

export const StartGameButton = ({
  selectedUsers,
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
            onClick={() => onClick(selectedUsers.map((user) => user.id))}
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
