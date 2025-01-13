import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useMatchResultModal } from "@/presentation/hooks/modal/use-match-result-modal";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/presentation/shadcnUI/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/presentation/shadcnUI/components/ui/table";
import { Button } from "@/presentation/shadcnUI/components/ui/button";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";
import { Separator } from "@/presentation/shadcnUI/components/ui/separator";

import { cn } from "@/presentation/shadcnUI/lib/utils";

import { MatchResultPlayer } from "@/presentation/types/matchResultPlayer";

interface MatchResultModalProps {
  matchResultPlayers: MatchResultPlayer[];
}

export const MatchResultModal = ({
  matchResultPlayers,
}: MatchResultModalProps) => {
  const navigate = useNavigate();

  const isOpen = useMatchResultModal((state) => state.isOpen);
  const onClose = useMatchResultModal((state) => state.onClose);

  const predefinedFields = ["final", "balance"];
  const roundFields = Array.from(
    { length: matchResultPlayers[0].rounds.length },
    (_, index) => `round${index + 1}`
  );
  const fields = [...roundFields, ...predefinedFields];

  const handleReMatch = () => {
    // TODO: もう一度マッチを開始する処理を追加
    onClose();
  };

  const handleEndMatch = () => {
    navigate("/");
  };

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[75vw] lg:max-w-[70vw] pt-0 WhiteDot">
          <DialogClose className="absolute top-4 right-4">
            <X onClick={handleEndMatch} className="size-6 my-auto" />
          </DialogClose>
          <DialogDescription className="sr-only">
            Match result modal with leaderboard and match records
          </DialogDescription>
          <ScrollArea className="h-[80vh] rounded-lg px-4 mt-10">
            <div className="space-y-4">
              <div id="leaderboard" className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-emerald-600/20 via-green-500/20 to-teal-600/20 opacity-75" />
                  <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-emerald-500/50" />
                  <DialogTitle className="relative z-10 text-4xl md:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 uppercase tracking-tight text-center animate-gradient-slow">
                    Leaderboard
                  </DialogTitle>
                  <Separator className="px-10 my-2 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400" />
                </motion.div>
                {/* TODO: 順位はAPIから取得する */}
                {[...matchResultPlayers]
                  .sort((a, b) => b.balance - a.balance)
                  .slice(0, 3)
                  .map((player, index) => (
                    <motion.div
                      key={player.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.3 }}
                      className="mt-4"
                    >
                      <div
                        className={cn(
                          "p-6 rounded-lg shadow-lg px-4",
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600 py-6"
                            : index === 1
                              ? "bg-gradient-to-r from-gray-300 to-gray-400 py-4"
                              : "bg-gradient-to-r from-amber-600 to-amber-700 py-2"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-white">
                              {index + 1}
                            </div>
                            <div className="text-2xl md:text-3xl xl:text-4xl font-bold text-white truncate max-w-[8rem] md:max-w-[12rem] lg:max-w-[20rem]">
                              {player.name}
                            </div>
                          </div>
                          <div className="flex justify-between items-center gap-4">
                            <div className="text-xl md:text-2xl xl:text-3xl text-white/90">
                              Final: {player.finalCredit.toLocaleString()}
                            </div>
                            <div className="text-xl md:text-2xl xl:text-3xl text-white/90">
                              Balance: {player.balance.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <Table className="mt-0">
                    <TableBody>
                      {/* TODO: 順位はAPIから取得する */}
                      {[...matchResultPlayers]
                        .sort((a, b) => b.balance - a.balance)
                        .slice(3)
                        .map((player, index) => (
                          <TableRow
                            key={`${player.name}-${index}`}
                            className="bg-white hover:bg-white/40 transition-colors"
                          >
                            <TableHead className="w-16">{index + 4}</TableHead>
                            <TableHead>{player.name}</TableHead>
                            <TableHead className="text-right">
                              {player.finalCredit.toLocaleString()}
                            </TableHead>
                            <TableHead className="text-right">
                              {player.balance.toLocaleString()}
                            </TableHead>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </motion.div>
              </div>
              <div id="records" className="space-y-2 pt-8">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-emerald-600/20 via-green-500/20 to-teal-600/20 opacity-75" />
                  <div className="relative">
                    <h2 className="relative z-10 text-2xl md:text-3xl xl:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 uppercase tracking-tight animate-gradient-slow">
                      Match Records
                    </h2>
                    <Separator className="px-10 my-2 bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400" />
                  </div>
                </div>
                <Separator className="my-2" />
                <Table>
                  <TableHeader className="sticky top-0 z-10">
                    <TableRow className="bg-slate-800 hover:bg-slate-800/90 transition-colors">
                      <TableHead className="text-white font-bold py-4 px-6">
                        Records
                      </TableHead>
                      {matchResultPlayers.map((player) => (
                        <TableHead
                          className="text-white font-bold py-4 px-6"
                          key={player.name}
                        >
                          {player.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow
                        key={field}
                        className={cn(
                          "hover:bg-slate-100 transition-colors",
                          index % 2 === 0 ? "bg-slate-200" : "bg-white"
                        )}
                      >
                        <TableHead className="font-semibold py-3 px-6">
                          {field}
                        </TableHead>
                        {matchResultPlayers.map((player, playerIndex) => (
                          <TableHead
                            key={playerIndex}
                            className="text-slate-600 py-3 px-6"
                          >
                            {field.startsWith("round") && player.rounds[index]}
                            {field === "final" && player.finalCredit}
                            {field === "balance" && player.balance}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <DialogFooter className="gap-y-2 mt-4">
              <Button
                variant="primary"
                onClick={handleReMatch}
                className="h-12 px-5"
              >
                Rematch
              </Button>
              <Button onClick={handleEndMatch} className="h-12 px-5">
                End Match
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
