import { Switch } from "@/presentation/shadcnUI/components/ui/switch";
import { Label } from "@/presentation/shadcnUI/components/ui/label";

interface HintToggleProps {
  onClick: () => void;
  isHintEnabled: boolean;
  className?: string;
  text: string;
}

export const HintToggle = ({
  onClick,
  isHintEnabled,
  className = "",
  text,
}: HintToggleProps) => {
  return (
    <div className="flex space-x-2">
      <Switch
        onClick={onClick}
        className={className}
        id="switch"
        checked={isHintEnabled}
      />
      <Label htmlFor="switch" className="mt-1">
        {text}
      </Label>
    </div>
  );
};
