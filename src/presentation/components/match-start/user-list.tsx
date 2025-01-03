import { UserCard } from "./user-card";

import { User } from "../../types/user";
import { cn } from "@/presentation/shadcnUI/lib/utils";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";

interface UserCardProps {
  title: string;
  users: User[];
  onUserAction: (user: User) => void;
  actionLabel: string;
  variant?: "danger";
  emptyMessage: string;
  isLoading?: boolean;
}

export const UserList = ({
  title,
  users = [],
  onUserAction,
  actionLabel,
  variant,
  emptyMessage,
  isLoading,
}: UserCardProps) => (
  <div
    className={cn(
      "bg-gradient-to-br rounded-xl border p-4 h-[40vh] md:h-[80vh] flex flex-col",
      title === "Selected Users" && "from-green-400 via-green-500 to-green-400",
      title === "Registered Users" &&
        "from-neutral-100 via-neutral-300 to-neutral-100"
    )}
  >
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <ScrollArea className="md:h-[70vh]">
      <div className="space-y-2">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">{emptyMessage}</p>
        ) : (
          users.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              onAction={() => onUserAction(user)}
              actionLabel={actionLabel}
              variant={variant}
            />
          ))
        )}
      </div>
    </ScrollArea>
  </div>
);
