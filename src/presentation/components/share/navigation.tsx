import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import {
  Menu,
  ChartColumn,
  House,
  Users,
  BookOpenText,
  ArrowRight,
} from "lucide-react";

import { Logo } from "./logo";

import { Button } from "@/presentation/shadcnUI/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/presentation/shadcnUI/components/ui/sheet";

import { cn } from "@/presentation/shadcnUI/lib/utils";

const routes = [
  {
    to: "/",
    label: "Home",
    Icon: House,
  },
  {
    to: "/users",
    label: "Users",
    Icon: Users,
  },
  {
    to: "/scores",
    label: "Scores",
    Icon: ChartColumn,
  },
  {
    to: "/rules",
    label: "Rules",
    Icon: BookOpenText,
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigation = useNavigate();
  const pathname = useLocation().pathname;
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (to: string) => {
    navigation(to);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="bg-gradient-to-l from-green-400 via-green-300 to-green-400">
            <Button
              variant="transparent"
              size="md"
              className="font-normal border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black transition"
            >
              <Menu size="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="px-2">
            <div className="flex items-center">
              <Logo size={16} />
              <p className="text-4xl font-['Dela_Gothic_One'] [-webkit-text-stroke:1px_#fff462] ml-2.5">
                Black Jack
              </p>
            </div>
            <nav className="flex flex-col gap-y-2 pt-6">
              {pathname !== "/match-start" && (
                <div className="border-b-2 pb-2 border-slate-300">
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => onClick("/match-start")}
                    className="w-full"
                  >
                    <span className="text-lg">Play</span>
                    <ArrowRight className="size-8" />
                  </Button>
                </div>
              )}
              {routes.map((route) => (
                <Button
                  key={route.to}
                  variant={route.to === pathname ? "outline" : "ghost"}
                  onClick={() => onClick(route.to)}
                  className={cn(
                    "w-full flex items-center justify-start gap-x-6 px-0",
                    route.to === pathname ? "text-green-500" : "text-black"
                  )}
                >
                  <route.Icon className="size-8 ml-2" />
                  <span>{route.label}</span>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto pl-2">
        {routes.map((route) => (
          <Button
            key={route.to}
            size="sm"
            variant="ghost"
            onClick={() => onClick(route.to)}
            className={cn(
              "underline",
              route.to === pathname
                ? "text-green-500 hover:text-green-500"
                : "text-black"
            )}
          >
            {route.label}
          </Button>
        ))}
        {pathname !== "/match-start" && (
          <div className="border-l-2 px-6 border-slate-300">
            <Button
              variant="success"
              size="md"
              onClick={() => onClick("/match-start")}
              className="w-full"
            >
              <span>Play</span>
              <ArrowRight className="size-6" />
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};
