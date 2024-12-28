export const Hero = () => {
  return (
    <>
      <div className="max-w-3xl space-y-2 text-center">
        <div className="relative inline-block z-0 w-full -space-y-3 md:-space-y-5">
          <h1
            className="
              text-5xl md:text-6xl xl:text-7xl text-black font-['Dela_Gothic_One'] [-webkit-text-stroke:3px_#fff462] tracking-wide
            "
          >
            BLACK
          </h1>
          <h1
            className="
              text-5xl md:text-6xl xl:text-7xl text-black font-['Dela_Gothic_One'] [-webkit-text-stroke:3px_#fff462] tracking-wide
            "
          >
            JACK
          </h1>
        </div>
        <h3 className="text-sm sm:text-base md:text-xl font-medium">
          Welcome to the Black Jack game! <br />
          Click the button below to start playing.
        </h3>
      </div>
    </>
  );
};
