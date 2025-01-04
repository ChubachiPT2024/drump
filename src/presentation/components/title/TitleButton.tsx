import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

import { cn } from "@/presentation/shadcnUI/lib/utils";
import { Button } from "@/presentation/shadcnUI/components/ui/button";

interface TitleButtonProps {
  to: string;
  text: string;
  icon: LucideIcon;
  direction?: string;
  variant?: "success" | "successOutline";
}

export const TitleButton = ({
  to,
  text,
  icon: Icon,
  direction = "flex-row",
  variant = "success",
}: TitleButtonProps) => {
  return (
    <>
      <Button
        variant={variant}
        className="group relative py-6 px-10 w-40 md:w-48 transition hover:scale-110 transform duration-500"
        asChild
      >
        <Link className={cn("flex hover:text-white", direction)} to={to}>
          <Icon className="hidden md:block size-8" />
          <span className="text-base md:text-xl">{text}</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-50%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(50%)]">
            <div className="relative h-full w-8 bg-white/20" />
          </div>
        </Link>
      </Button>
    </>
  );
};
