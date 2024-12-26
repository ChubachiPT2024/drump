import { LucideIcon } from "lucide-react";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

interface HelpProps {
  icon: LucideIcon;
  size: number;
}

export const HelpButton = ({ icon: Icon, size }: HelpProps) => {
  return (
    <>
      <Button size="round" className={`size-${size}`}>
        <Icon />
      </Button>
    </>
  );
};
