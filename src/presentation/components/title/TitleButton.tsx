import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

import { cn } from "@/presentation/shadcnUI/lib/utils";
import { Button } from "@/presentation/shadcnUI/components/ui/button";

interface TitleButtonProps {
  to: string;
  text: string;
  icon: LucideIcon;
  buttonSize?: string;
  direction?: string;
  iconSize?: string;
}

export const TitleButton = ({
  to,
  text,
  icon: Icon,
  // 正方形のボタンを基準
  buttonSize = "md:size-32",
  direction = "flex-col",
  iconSize = "size-20",
}: TitleButtonProps) => {
  return (
    <>
      <Button
        className={cn(
          "group relative py-6 px-10 w-40 transition hover:scale-110",
          buttonSize
        )}
        asChild
      >
        <Link className={cn("flex", direction)} to={to}>
          <Icon className={cn("hidden md:block", iconSize)} />
          <span className="text-base md:text-xl">{text}</span>
          <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
            <div className="relative h-full w-8 bg-white/20" />
          </div>
        </Link>
      </Button>
    </>
  );
};
