import Card from "@/components/card";

const Game = () => {
  return (
    <div>
      <Card isOpen={true} />
      <Card isOpen={false} />
    </div>
  );
};

export default Game;
