import { CategoryDeleteDialog } from "@/app/settings/category-delete-dialog";
import { CategoryFormDialog } from "@/app/settings/category-form-dialog";
import { CategoryOptionsList } from "@/app/settings/category-options-list";
import { TableCell, TableRow } from "@/components/ui/table";
import { type RouterOutputs } from "@/trpc/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type CategoriesListBodyRowProps = {
  category: RouterOutputs["categories"]["getAll"][number];
};

export function CategoriesListBodyRow({
  category,
}: CategoriesListBodyRowProps) {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategoryExpansion = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  return (
    <>
      <TableRow
        key={category.id}
        className="cursor-pointer"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("button")) {
            toggleCategoryExpansion(category.id);
          }
        }}
      >
        <TableCell>
          <div className="flex items-center">
            {expandedCategories.includes(category.id) ? (
              <ChevronDown className="mr-2 h-4 w-4" />
            ) : (
              <ChevronRight className="mr-2 h-4 w-4" />
            )}
            {category.title}
          </div>
        </TableCell>
        <TableCell>{category.options.length}</TableCell>
        <TableCell className="w-fit min-w-fit max-w-fit">
          <div className="inline-flex gap-2">
            <CategoryFormDialog category={category} />
            <CategoryDeleteDialog category={category} />
          </div>
        </TableCell>
      </TableRow>
      {expandedCategories.includes(category.id) && (
        <CategoryOptionsList
          categoryId={category.id}
          categoryOptions={category.options}
        />
      )}
    </>
  );
}
