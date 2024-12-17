export const Hero = () => {
  return (
    <>
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
    </>
  );
};
