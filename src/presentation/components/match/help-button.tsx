import { LucideIcon } from "lucide-react";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

interface HelpProps {
  icon: LucideIcon;
  size: number;
  onClick?: () => void;
}

export const HelpButton = ({ icon: Icon, size, onClick }: HelpProps) => {
  return (
    <>
      <Button size="round" className={`size-${size}`} onClick={onClick}>
        <Icon />
      </Button>
    </>
  );
};
