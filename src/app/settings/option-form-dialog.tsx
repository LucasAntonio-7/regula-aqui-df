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

const optionFormSchema = z.object({
  title: z.string(),
});
type OptionFormSchema = z.infer<typeof optionFormSchema>;

type OptionFormDialogProps = {
  categoryId: number;
  option?: RouterOutputs["categories"]["getAll"][number]["options"][number];
};

export function OptionFormDialog({
  categoryId,
  option,
}: OptionFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const utils = api.useUtils();
  const optionCreateMutation = api.options.create.useMutation({
    onSuccess: async () => {
      toast.success("Opção criada com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const optionUpdateMutation = api.options.update.useMutation({
    onSuccess: async () => {
      toast.success("Opção atualizada com sucesso");
      await utils.categories.getAll.invalidate();
      setIsOpen(false);
    },
  });
  const formIsPending =
    optionCreateMutation.isPending || optionUpdateMutation.isPending;

  const form = useForm<OptionFormSchema>({
    resolver: zodResolver(optionFormSchema),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    if (option) {
      form.reset({ title: option.title });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option]);

  const onSubmit = async (values: OptionFormSchema) => {
    if (option) {
      await optionUpdateMutation.mutateAsync({
        id: option.id,
        data: {
          title: values.title,
        },
      });
    } else {
      await optionCreateMutation.mutateAsync({
        categoryId,
        data: {
          title: values.title,
        },
      });
    }
  };

  return (
    <>
      <Button
        variant={option ? "secondary" : "default"}
        onClick={() => setIsOpen(true)}
      >
        {option ? (
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
              <DialogTitle>{option ? "Editar" : "Adicionar"} Opção</DialogTitle>
              {formIsPending && <Loader className="size-4 animate-spin" />}
            </div>
            <DialogDescription className="sr-only">
              {option ? "Editar" : "Adicionar"} Opção
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
