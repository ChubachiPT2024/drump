import Avatar, { genConfig } from "react-nice-avatar";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

import { User } from "@/presentation/types/user";

interface UserCardProps {
  user: User;
  onAction: (user: User) => void;
  actionLabel: string;
  variant?: "danger";
}

export const UserCard = ({
  user,
  onAction,
  actionLabel,
  variant,
}: UserCardProps) => {
  const config = genConfig(user.name);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-row justify-between items-center gap-4 w-full">
      <Avatar className="size-10 md:size-16" {...config} />
      <span className="font-medium truncate">{user.name}</span>
      <Button
        size="sm"
        variant={variant}
        className="uppercase"
        onClick={() => onAction(user)}
      >
        {actionLabel}
      </Button>
    </div>
  );
};
