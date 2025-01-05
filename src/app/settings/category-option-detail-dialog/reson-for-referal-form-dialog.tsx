import { TextEditor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Loader, PenSquare, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const reasonForReferalFormSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  assistedText: z.string().min(1, { message: "Texto Assistido é obrigatório" }),
});
type ReasonForReferalFormSchema = z.infer<typeof reasonForReferalFormSchema>;

type ResonForReferalFormDialogProps = {
  optionId: number;
  reasonForReferal?: RouterOutputs["categories"]["getAll"][number]["options"][number]["reasonForReferal"][number];
};

export function ResonForReferalFormDialog({
  optionId,
  reasonForReferal,
}: ResonForReferalFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ReasonForReferalFormSchema>({
    resolver: zodResolver(reasonForReferalFormSchema),
    defaultValues: {
      title: "",
      assistedText: "",
    },
  });
  useEffect(() => {
    if (reasonForReferal) {
      form.reset({
        title: reasonForReferal.title,
        assistedText: reasonForReferal.assistedText,
      });
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasonForReferal]);

  const utils = api.useUtils();
  const reasonForReferalCreateMutation =
    api.reasonForReferal.create.useMutation({
      onSuccess: async () => {
        toast.success("Texto Assistido adicionado com sucesso");
        await Promise.all([
          utils.categories.getAll.invalidate(),
          utils.reasonForReferal.getAll.invalidate({ optionId }),
        ]);
        form.reset();
        setIsOpen(false);
      },
    });
  const reasonForReferalUpdateMutation =
    api.reasonForReferal.update.useMutation({
      onSuccess: async () => {
        toast.success("Texto Assistido atualizado com sucesso");
        await Promise.all([
          utils.categories.getAll.invalidate(),
          utils.reasonForReferal.getAll.invalidate({ optionId }),
        ]);
        form.reset();
        setIsOpen(false);
      },
    });
  const formIsPending =
    reasonForReferalCreateMutation.isPending ||
    reasonForReferalUpdateMutation.isPending;

  const onSubmit = (data: ReasonForReferalFormSchema) => {
    if (reasonForReferal) {
      reasonForReferalUpdateMutation.mutate({
        id: reasonForReferal.id,
        data,
      });
    } else {
      reasonForReferalCreateMutation.mutate({ optionId, data });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={reasonForReferal ? "secondary" : "default"}>
          {reasonForReferal ? (
            <>
              <PenSquare className="size-4" />
              Atualizar
            </>
          ) : (
            <>
              <Plus className="size-4" />
              Adicionar Texto Assistido
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[800px]">
        <DialogHeader>
          <div className="inline-flex gap-2">
            <DialogTitle>
              {reasonForReferal
                ? "Atualizar Texto Assistido"
                : "Adicionar Texto Assistido"}
            </DialogTitle>
            {formIsPending && <Loader className="size-4 animate-spin" />}
          </div>
        </DialogHeader>
        <DialogDescription className="sr-only">
          {reasonForReferal
            ? "Atualizar Texto Assistido"
            : "Adicionar Texto Assistido"}
        </DialogDescription>
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
                    <Input {...field} disabled={formIsPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assistedText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texto Assistido</FormLabel>
                  <FormControl>
                    <TextEditor
                      value={field.value}
                      onChange={field.onChange}
                      toolbarId="toolbar-assisted-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  form.reset();
                  setIsOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full" disabled={formIsPending}>
                {reasonForReferal ? "Atualizar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
