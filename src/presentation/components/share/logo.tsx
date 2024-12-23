import { cn } from "@/presentation/shadcnUI/lib/utils";

interface LogoProps {
  size: string;
}

export const Logo = ({ size }: LogoProps) => {
  return (
    <>
      <img
        src="/Drump.png"
        alt="Drump Logo"
        className={cn("object-contain", size)}
      />
    </>
  );
};
