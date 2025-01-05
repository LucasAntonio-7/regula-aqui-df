import { CategoryOptionListDialog } from "@/app/settings/category-option-detail-dialog";
import { OptionDeleteDialog } from "@/app/settings/option-delete-dialog";
import { OptionFormDialog } from "@/app/settings/option-form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type RouterOutputs } from "@/trpc/react";
import { ExpandIcon } from "lucide-react";
import { useState } from "react";

type CategoryOptionsListProps = {
  categoryId: number;
  categoryOptions: RouterOutputs["categories"]["getAll"][number]["options"];
};

export function CategoryOptionsList({
  categoryId,
  categoryOptions,
}: CategoryOptionsListProps) {
  const [categoryOptionDialogIsOpen, setCategoryOptionDialogIsOpen] =
    useState(false);
  const [categoryOptionSelected, setCategoryOptionSelected] = useState<
    RouterOutputs["categories"]["getAll"][number]["options"][number] | null
  >(null);

  return (
    <>
      <TableRow>
        <TableCell colSpan={3}>
          <Card>
            <CardHeader>
              <div className="flex w-full items-center justify-between">
                <CardTitle className="text-xl">Opções</CardTitle>
                <OptionFormDialog categoryId={categoryId} />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Opção</TableHead>
                    <TableHead className="w-fit min-w-fit max-w-fit">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryOptions?.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell>{option.title}</TableCell>
                      <TableCell className="w-fit min-w-fit max-w-fit">
                        <div className="inline-flex w-fit gap-2">
                          <OptionFormDialog
                            categoryId={categoryId}
                            option={option}
                          />
                          <OptionDeleteDialog
                            categoryId={categoryId}
                            option={option}
                          />
                          <Button
                            onClick={() => {
                              setCategoryOptionDialogIsOpen(true);
                              setCategoryOptionSelected(option);
                            }}
                          >
                            <ExpandIcon className="size-4" />
                            Expandir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TableCell>
      </TableRow>
      {categoryOptionDialogIsOpen && categoryOptionSelected ? (
        <CategoryOptionListDialog
          categoryOption={categoryOptionSelected}
          isOpen={categoryOptionDialogIsOpen}
          onChangeIsOpen={setCategoryOptionDialogIsOpen}
        />
      ) : null}
    </>
  );
}
