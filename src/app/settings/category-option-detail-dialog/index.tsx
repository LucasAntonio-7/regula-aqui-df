/* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
import { ResonForReferalDeleteDialog } from "@/app/settings/category-option-detail-dialog/reson-for-referal-delete-dialog";
import { ResonForReferalFormDialog } from "@/app/settings/category-option-detail-dialog/reson-for-referal-form-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api, type RouterOutputs } from "@/trpc/react";
import "react-quill-new/dist/quill.snow.css"; // Import the styles

type CategoryOptionListDialogProps = {
  categoryOption: RouterOutputs["categories"]["getAll"][number]["options"][number];
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
};

export function CategoryOptionListDialog({
  categoryOption,
  isOpen,
  onChangeIsOpen,
}: CategoryOptionListDialogProps) {
  const { data } = api.reasonForReferal.getAll.useQuery({
    optionId: categoryOption.id,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onChangeIsOpen}>
      <DialogContent
        className="h-full overflow-y-auto sm:min-w-[1200px]"
        easyClose={false}
      >
        <DialogHeader>
          <div className="flex items-center gap-4">
            <DialogTitle>Opção: {categoryOption.title}</DialogTitle>
            <ResonForReferalFormDialog optionId={categoryOption.id} />
          </div>
          <DialogDescription className="sr-only">
            Texto Assistido
          </DialogDescription>
        </DialogHeader>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Texto Assistido</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((reason) => (
                <TableRow key={reason.id}>
                  <TableCell>{reason.title}</TableCell>
                  <TableCell>
                    <div
                      className="ql-editor"
                      dangerouslySetInnerHTML={{ __html: reason.assistedText }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex gap-2">
                      <ResonForReferalFormDialog
                        optionId={categoryOption.id}
                        reasonForReferal={reason}
                      />
                      <ResonForReferalDeleteDialog
                        optionId={categoryOption.id}
                        reasonForReferal={reason}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
