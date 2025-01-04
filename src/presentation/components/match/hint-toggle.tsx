import { LucideIcon } from "lucide-react";
import { Toggle } from "@/presentation/shadcnUI/components/ui/toggle";

interface HintToggleProps {
  icon: LucideIcon;
  size: number;
  onClick: () => void;
}

export const HintToggle = ({ icon: Icon, size, onClick }: HintToggleProps) => {
  return (
    <>
      <Toggle className={`size-${size}`} onClick={onClick}>
        <Icon />
      </Toggle>
    </>
  );
};
