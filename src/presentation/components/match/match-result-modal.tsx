import { X } from "lucide-react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useMatchResultModal } from "@/presentation/hooks/use-match-result-modal";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
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

// TODO: マッチ結果をapiから取得する
const matchResult = [
  {
    name: "Player 1",
    round1: 50000,
    round2: 50000,
    round3: 51000,
    round4: 52000,
    round5: 53000,
    round6: 54000,
    round7: 55000,
    round8: 56000,
    round9: 57000,
    round10: 58000,
    final: 58000,
    balance: 8000,
  },
  {
    name: "Player 2",
    round1: 50000,
    round2: 51000,
    round3: 52000,
    round4: 53000,
    round5: 54000,
    round6: 55000,
    round7: 56000,
    round8: 57000,
    round9: 58000,
    round10: 59000,
    final: 59000,
    balance: 9000,
  },
  {
    name: "Player 3",
    round1: 50000,
    round2: 52000,
    round3: 53000,
    round4: 54000,
    round5: 55000,
    round6: 56000,
    round7: 57000,
    round8: 58000,
    round9: 59000,
    round10: 60000,
    final: 60000,
    balance: 10000,
  },
  {
    name: "Player 4",
    round1: 50000,
    round2: 53000,
    round3: 54000,
    round4: 55000,
    round5: 56000,
    round6: 57000,
    round7: 58000,
    round8: 59000,
    round9: 60000,
    round10: 61000,
    final: 61000,
    balance: 11000,
  },
  {
    name: "Player 5",
    round1: 50000,
    round2: 54000,
    round3: 55000,
    round4: 56000,
    round5: 57000,
    round6: 58000,
    round7: 59000,
    round8: 60000,
    round9: 61000,
    round10: 62000,
    final: 62000,
    balance: 12000,
  },
];

export const MatchResultModal = () => {
  const navigate = useNavigate();

  const isOpen = useMatchResultModal((state) => state.isOpen);
  const onClose = useMatchResultModal((state) => state.onClose);

  const fields = Object.keys(matchResult[0]).filter(
    (key): key is keyof (typeof matchResult)[0] => key !== "name"
  );

  const handleReMatch = () => {
    // TODO: もう一度マッチを開始する処理を追加
    onClose();
  };

  const handleEndMatch = () => {
    onClose();
    navigate("/");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[75vw] lg:max-w-[70vw] pt-0 WhiteDot">
          <DialogClose className="absolute top-4 right-4">
            <X className="size-6 my-auto" />
          </DialogClose>
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
                {[...matchResult]
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
                              Final: {player.final.toLocaleString()}
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
                      {[...matchResult]
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
                              {player.final.toLocaleString()}
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
                        Round
                      </TableHead>
                      {matchResult.map((player) => (
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
                        {matchResult.map((player, playerIndex) => (
                          <TableHead
                            key={playerIndex}
                            className="text-slate-600 py-3 px-6"
                          >
                            {player[field].toLocaleString()}
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
