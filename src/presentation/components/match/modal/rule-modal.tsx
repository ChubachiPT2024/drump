import { useRuleModal } from "@/presentation/hooks/modal/use-rule-modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/presentation/shadcnUI/components/ui/dialog";
import { Button } from "@/presentation/shadcnUI/components/ui/button";
import { ScrollArea } from "@/presentation/shadcnUI/components/ui/scroll-area";
import { RuleContent } from "@/presentation/components/match/rule-content";

export const RuleModal = () => {
  const isOpen = useRuleModal((state) => state.isOpen);
  const onClose = useRuleModal((state) => state.onClose);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        className="GreenDot border-2 border-yellow-500 shadow-sm shadow-yellow-500 w-full max-w-2xl h-[80vh] p-0 gap-0 flex flex-col overflow-hidden"
      >
        <DialogHeader className="pt-2 -space-y-1 shrink-0">
          <DialogTitle className="text-3xl text-center text-white">
            Rule
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-white"></DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <RuleContent />
        </ScrollArea>
        <DialogFooter className="sm:justify-center my-2 ">
          <Button
            onClick={onClose}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
