import { UserCard } from "./user-card";

import { cn } from "@/presentation/shadcnUI/lib/utils";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";
import { Skeleton } from "@/presentation/shadcnUI/components/ui/skeleton";

import { User } from "../../types/user";

interface UserListProps {
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
}: UserListProps) => {
  const LoadingSkeleton = () => (
    <div className="p-4 rounded-lg shadow-sm border flex items-center gap-4 h-24">
      <Skeleton className="size-16 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <Skeleton className="h-9 w-24" />
    </div>
  );

  return (
    <div
      className={cn(
        "bg-gradient-to-br rounded-xl border p-4 h-[40vh] md:h-[80vh] flex flex-col",
        title === "Selected Users"
          ? "from-green-400 via-green-500 to-green-400"
          : "from-neutral-100 via-neutral-300 to-neutral-100"
      )}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <ScrollArea className="md:h-[70vh]">
        <div className="space-y-2">
          {isLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => <LoadingSkeleton key={i} />)
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">{emptyMessage}</p>
          ) : (
            users.map((user) => (
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
};
