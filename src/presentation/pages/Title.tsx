import { ArrowRight, Users, BookOpenText, ChartColumn } from "lucide-react";

import { Header } from "../components/share/Header";
import { Hero } from "../components/title/Hero";
import { TitleButton } from "../components/title/TitleButton";

export const TitlePage = () => {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="min-h-full flex flex-col items-center justify-center text-center gap-y-4 flex-1 px-6 pt-16 pb-10">
        <Hero />
        <div className="space-y-4 md:space-y-8">
          <TitleButton
            to="match-start"
            text="スタート"
            icon={ArrowRight}
            buttonSize="md:w-48"
            direction="flex-row-reverse"
            iconSize="size-8"
          />
          <div className="flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-52">
            <TitleButton to="/scores" text="スコア" icon={ChartColumn} />
            <TitleButton to="/users" text="プレイヤー登録" icon={Users} />
            <TitleButton to="/rules" text="遊び方" icon={BookOpenText} />
          </div>
        </div>
      </div>
    </main>
  );
};
