import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpenText, ChartColumn } from "lucide-react";

import { Button } from "@/presentation/shadcnUI/components/ui/button";

export default function TitlePage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="hidden absolute top-4 left-4 md:block items-center">
        <img
          src="/Drump.png"
          alt="Drump Logo"
          className="size-32 object-contain"
        />
      </div>

      <div className="min-h-full flex flex-col items-center justify-center md:justify-start text-center gap-y-4 flex-1 px-6 pb-10">
        <div className="max-w-3xl space-y-4">
          <div className="relative inline-block z-0 w-full -space-y-3 md:-space-y-6">
            <h1
              className="
                            text-5xl md:text-6xl xl:text-7xl text-black font-['Dela_Gothic_One'] [-webkit-text-stroke:3px_#fff462]
                            before:md:block before:md:content-[''] before:md:absolute before:w-full
                            before:md:h-10 before:md:bg-black before:md:mt-6 before:md:-z-10
                            after:md:block after:md:content-[''] after:md:absolute after:md:w-full
                            after:md:bg-black after:md:-mt-2 after:md:-z-10 after:md:border-solid
                            after:md:border-t-[12px] after:md:border-t-black
                            after:md:border-l-[16px] after:md:border-l-white
                            after:md:border-r-[16px] after:md:border-r-white
                        "
            >
              BLACK
            </h1>
            <h1
              className="
                            text-5xl md:text-6xl xl:text-7xl text-black font-['Dela_Gothic_One'] [-webkit-text-stroke:3px_#fff462]
                            before:md:block before:md:content-[''] before:md:absolute before:md:w-full
                            before:md:h-9 before:md:bg-black before:md:mt-6 before:md:-z-10
                            after:md:block after:md:content-[''] after:md:absolute after:md:w-full
                            after:md:bg-black after:md:-mt-2 after:md:-z-10 after:md:border-solid
                            after:md:border-t-[12px] after:md:border-t-black
                            after:md:border-l-[16px] after:md:border-l-white
                            after:md:border-r-[16px] after:md:border-r-white
                        "
            >
              JACK
            </h1>
          </div>
          <h3 className="text-base sm:text-xl md:text-2xl font-medium">
            Welcome to the Black Jack game! <br />
            Click the button below to start playing.
          </h3>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-8">
          <div className="flex justify-center">
            <Button className="group relative items-center justify-center overflow-hidden rounded-md py-6 px-10 w-40 md:w-48 font-medium text-neutral-200 transition hover:scale-110">
              {/* TODO: スタートのパスを指定する */}
              <Link className="flex flex-row" to="/#">
                <span className="text-base md:text-2xl">スタート</span>
                <ArrowRight className="hidden md:block size-8 ml-1 -mr-2" />
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-15deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
              </Link>
            </Button>
          </div>
          <div className="flex flex-col justify-center md:flex-row space-y-4 md:space-y-0 md:space-x-52">
            <Button
              className="py-6 px-10 md:size-32 transition hover:scale-110"
              asChild
            >
              {/* TODO: スコアのパスを指定する */}
              <Link className="flex flex-col" to="/#">
                <ChartColumn className="hidden md:block size-20" />
                <span className="text-sm md:text-xl">スコア</span>
              </Link>
            </Button>
            <Button
              className="py-6 px-10 md:size-32 transition hover:scale-110"
              asChild
            >
              {/* TODO: プレイヤー登録のパスを指定する */}
              <Link className="flex flex-col" to="/#">
                <Users className="hidden md:block size-20" />
                <span className="text-sm md:text-xl">プレイヤー登録</span>
              </Link>
            </Button>
            <Button
              className="py-6 px-10 md:size-32 transition hover:scale-110"
              asChild
            >
              {/* TODO: 遊び方のパスを指定する */}
              <Link className="flex flex-col" to="/#">
                <BookOpenText className="hidden md:block size-20" />
                <span className="text-sm md:text-xl">遊び方</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
