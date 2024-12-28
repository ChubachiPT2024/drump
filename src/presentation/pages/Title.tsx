import { motion } from "framer-motion";
import { ArrowRight, Users, BookOpenText, ChartColumn } from "lucide-react";

import { Logo } from "../components/share/logo";
import { Hero } from "../components/title/Hero";
import { TitleButton } from "../components/title/TitleButton";

const cards = [
  "/trump/heartA.png",
  "/trump/back.png",
  "/trump/heart2.png",
  "/trump/back.png",
  "/trump/heart3.png",
  "/trump/back.png",
  "/trump/heart4.png",
  "/trump/back.png",
  "/trump/heart5.png",
  "/trump/back.png",
  "/trump/heart6.png",
  "/trump/back.png",
  "/trump/heart7.png",
  "/trump/back.png",
  "/trump/heart8.png",
  "/trump/back.png",
  "/trump/heart9.png",
  "/trump/back.png",
  "/trump/heart10.png",
  "/trump/back.png",
  "/trump/heartJ.png",
  "/trump/back.png",
  "/trump/heartQ.png",
  "/trump/back.png",
  "/trump/heartK.png",
  "/trump/back.png",
  "/trump/diamondA.png",
  "/trump/back.png",
  "/trump/diamond2.png",
  "/trump/back.png",
  "/trump/diamond3.png",
  "/trump/back.png",
  "/trump/diamond4.png",
  "/trump/back.png",
  "/trump/diamond5.png",
  "/trump/back.png",
  "/trump/diamond6.png",
  "/trump/back.png",
  "/trump/diamond7.png",
  "/trump/back.png",
  "/trump/diamond8.png",
  "/trump/back.png",
  "/trump/diamond9.png",
  "/trump/back.png",
  "/trump/diamond10.png",
  "/trump/back.png",
  "/trump/diamondJ.png",
  "/trump/back.png",
  "/trump/diamondQ.png",
  "/trump/back.png",
  "/trump/diamondK.png",
  "/trump/back.png",
  "/trump/spadeA.png",
  "/trump/back.png",
  "/trump/spade2.png",
  "/trump/back.png",
  "/trump/spade3.png",
  "/trump/back.png",
  "/trump/spade4.png",
  "/trump/back.png",
  "/trump/spade5.png",
  "/trump/back.png",
  "/trump/spade6.png",
  "/trump/back.png",
  "/trump/spade7.png",
  "/trump/back.png",
  "/trump/spade8.png",
  "/trump/back.png",
  "/trump/spade9.png",
  "/trump/back.png",
  "/trump/spade10.png",
  "/trump/back.png",
  "/trump/spadeJ.png",
  "/trump/back.png",
  "/trump/spadeQ.png",
  "/trump/back.png",
  "/trump/spadeK.png",
  "/trump/back.png",
  "/trump/clubA.png",
  "/trump/back.png",
  "/trump/club2.png",
  "/trump/back.png",
  "/trump/club3.png",
  "/trump/back.png",
  "/trump/club4.png",
  "/trump/back.png",
  "/trump/club5.png",
  "/trump/back.png",
  "/trump/club6.png",
  "/trump/back.png",
  "/trump/club7.png",
  "/trump/back.png",
  "/trump/club8.png",
  "/trump/back.png",
  "/trump/club9.png",
  "/trump/back.png",
  "/trump/club10.png",
  "/trump/back.png",
  "/trump/clubJ.png",
  "/trump/back.png",
  "/trump/clubQ.png",
  "/trump/back.png",
  "/trump/clubK.png",
  "/trump/back.png",
];

const generateRandomStyle = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
  rotate: `${Math.random() * 360}deg`,
  scale: Math.random() * 0.5 + 0.5,
});

export const TitlePage = () => {
  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 WhiteDot z-0">
          <div className="min-h-screen hidden md:block z-20">
            <div className="h-[85vh] bg-gradient-to-t from-green-400/90 via-green-500 to-green-400/90 hidden md:flex items-center justify-center m-9 rounded-lg">
              <motion.div
                key="logo"
                initial={{ rotate: 0 }}
                animate={{ rotate: 720 }}
                transition={{ duration: 1 }}
                className="pt-2"
              >
                <Logo size={60} />
              </motion.div>
            </div>
          </div>
          <div className="min-h-screen relative md:flex flex-col items-center px-4 z-20 bg-neutral-50/80">
            <motion.div
              key="title"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 5,
                stiffness: 40,
                restDelta: 0.001,
                duration: 0.3,
              }}
            >
              <div className="pt-12">
                <Hero />
              </div>
              <div className="flex flex-col items-center space-y-2 md:space-y-4 pt-2">
                <TitleButton
                  to="match-start"
                  text="Play"
                  icon={ArrowRight}
                  direction="flex-row-reverse"
                />
                <TitleButton
                  to="/users"
                  text="Add a Player"
                  icon={Users}
                  variant="successOutline"
                />
                <TitleButton
                  to="/scores"
                  text="Score"
                  icon={ChartColumn}
                  variant="successOutline"
                />
                <TitleButton
                  to="/rules"
                  text="How to PLay"
                  icon={BookOpenText}
                  variant="successOutline"
                />
              </div>
            </motion.div>
          </div>
        </div>
        {cards.map((card, index) => (
          <motion.img
            key={index}
            src={card}
            alt="playing-card"
            className="absolute rounded-md h-28 z-10"
            style={generateRandomStyle()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.01,
              duration: 0.1,
            }}
          />
        ))}
      </div>
    </>
  );
};
