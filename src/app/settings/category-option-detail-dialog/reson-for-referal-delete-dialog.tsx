import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api, type RouterOutputs } from "@/trpc/react";
import { Loader, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ResonForReferalDeleteDialogProps = {
  optionId: number;
  reasonForReferal: RouterOutputs["categories"]["getAll"][number]["options"][number]["reasonForReferal"][number];
};

export function ResonForReferalDeleteDialog({
  optionId,
  reasonForReferal,
}: ResonForReferalDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const utils = api.useUtils();
  const reasonForReferalDeleteMutation =
    api.reasonForReferal.delete.useMutation({
      onSuccess: async () => {
        toast.success("Texto Assistido deletado com sucesso");
        await Promise.all([
          utils.categories.getAll.invalidate(),
          utils.reasonForReferal.getAll.invalidate({ optionId }),
        ]);
        setIsOpen(false);
      },
    });
  const formIsPending = reasonForReferalDeleteMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <TrashIcon className="size-4" />
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="inline-flex gap-2">
            <DialogTitle>Deletar Texto Assistido</DialogTitle>
            {formIsPending && <Loader className="size-4 animate-spin" />}
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Deletar Texto Assistido
        </DialogDescription>
        <div className="flex flex-col gap-4">
          <p>
            Tem certeza que deseja deletar o texto assistido{" "}
            {reasonForReferal.title}?
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="w-full">
              Cancelar
            </Button>
            <Button
              className="w-full"
              disabled={formIsPending}
              onClick={() => {
                reasonForReferalDeleteMutation.mutate({
                  optionId,
                  reasonForReferalId: reasonForReferal.id,
                });
              }}
            >
              Deletar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
