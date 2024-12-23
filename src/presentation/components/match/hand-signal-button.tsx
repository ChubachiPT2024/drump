import { LucideIcon } from "lucide-react";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

interface HandSignalButtonProps {
  text: string;
  icon: LucideIcon;
  variant: "primary" | "danger" | "success" | "warning";
  disabled?: boolean;
  action: () => void;
}

export const HandSignalButton = ({
  text,
  variant,
  icon: Icon,
  disabled,
  action,
}: HandSignalButtonProps) => {
  return (
    <>
      <div className="border-2 border-yellow-500 rounded-full">
        <Button
          variant={variant}
          size="round"
          onClick={action}
          className="size-14 flex flex-col gap-y-0.5"
          disabled={disabled}
        >
          <Icon className="size-7" />
          <span className="text-xs">{text}</span>
        </Button>
      </div>
    </>
  );
};
