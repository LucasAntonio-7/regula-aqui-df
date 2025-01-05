"use client";

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

type OptionDeleteDialogProps = {
  categoryId: number;
  option: RouterOutputs["categories"]["getAll"][number]["options"][number];
};

export function OptionDeleteDialog({
  categoryId,
  option,
}: OptionDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();
  const deleteOptionMutation = api.options.delete.useMutation({
    onSuccess: async () => {
      toast.success("Opção excluída com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const formIsPending = deleteOptionMutation.isPending;

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
            <DialogTitle>Excluir Opção</DialogTitle>
            {formIsPending && <Loader className="size-4 animate-spin" />}
          </div>
          <DialogDescription className="sr-only">
            Excluir Opção
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Tem certeza que deseja excluir a opção {option.title}?</p>
          <div className="inline-flex w-full justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={formIsPending}
              onClick={() => {
                deleteOptionMutation.mutate({
                  categoryId,
                  optionid: option.id,
                });
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
