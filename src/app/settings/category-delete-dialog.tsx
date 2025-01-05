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

type CategoryDeleteDialogProps = {
  category: RouterOutputs["categories"]["getAll"][number];
};

export function CategoryDeleteDialog({ category }: CategoryDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();
  const deleteCategoryMutation = api.categories.delete.useMutation({
    onSuccess: async () => {
      toast.success("Categoria excluída com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const formIsPending = deleteCategoryMutation.isPending;

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
            <DialogTitle>Excluir Categoria</DialogTitle>
            {formIsPending && <Loader className="size-4 animate-spin" />}
          </div>
          <DialogDescription className="sr-only">
            Excluir Categoria
          </DialogDescription>
        </DialogHeader>
        <div>
          <p>Tem certeza que deseja excluir a categoria {category.title}?</p>
          <div className="inline-flex w-full justify-between">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              disabled={formIsPending}
              onClick={() => {
                deleteCategoryMutation.mutate({ id: category.id });
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
