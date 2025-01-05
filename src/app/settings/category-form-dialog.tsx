"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api, type RouterOutputs } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, PlusIcon, SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categoryFormSchema = z.object({
  title: z.string(),
});
type CategoryForm = z.infer<typeof categoryFormSchema>;

type CategoryFormDialogProps = {
  category?: RouterOutputs["categories"]["getAll"][number];
};

export function CategoryFormDialog({ category }: CategoryFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();
  const categoryCreateMutation = api.categories.create.useMutation({
    onSuccess: async () => {
      toast.success("Categoria criada com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const categoryUpdateMutation = api.categories.update.useMutation({
    onSuccess: async () => {
      toast.success("Categoria atualizada com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const formIsPending =
    categoryCreateMutation.isPending || categoryUpdateMutation.isPending;

  const form = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    if (category) {
      form.reset({ title: category.title });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onSubmit = async (values: CategoryForm) => {
    if (category) {
      await categoryUpdateMutation.mutateAsync({
        id: category.id,
        title: values.title,
      });
    } else {
      await categoryCreateMutation.mutateAsync({
        title: values.title,
      });
    }
  };

  return (
    <>
      <Button
        variant={category ? "secondary" : "default"}
        onClick={() => setIsOpen(true)}
      >
        {category ? (
          <>
            <SquarePenIcon className="size-4" />
            Editar
          </>
        ) : (
          <>
            <PlusIcon className="size-4" />
            Adicionar
          </>
        )}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="inline-flex gap-2">
              <DialogTitle>
                {category ? "Editar" : "Adicionar"} Categoria
              </DialogTitle>
              {formIsPending && <Loader className="size-4 animate-spin" />}
            </div>
            <DialogDescription className="sr-only">
              {category ? "Editar" : "Adicionar"} Categoria
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cardiologia"
                        disabled={formIsPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-between">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button type="submit" disabled={formIsPending}>
                  Adicionar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
