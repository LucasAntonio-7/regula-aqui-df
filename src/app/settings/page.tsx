"use client";
import { CategoriesListBodyRow } from "@/app/settings/categories-list-body-row";
import { CategoryFormDialog } from "@/app/settings/category-form-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { CogIcon } from "lucide-react";

export default function SettingsPage() {
  const { data: categories } = api.categories.getAll.useQuery();
  if (!categories) return null;
  return (
    <div className="flex h-screen flex-col gap-4">
      <div className="flex items-center gap-3 border-b-2 border-gray-400 px-10 py-4">
        <CogIcon className="size-6" />
        <h1 className="text-3xl font-extrabold">Configurações</h1>
      </div>
      <div className="flex h-screen w-screen flex-col px-10 py-4">
        <Card>
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <CardTitle>Categorias</CardTitle>
              <CategoryFormDialog />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Nome</TableHead>
                  <TableHead>Quantidade de Opções</TableHead>
                  <TableHead className="w-fit min-w-fit max-w-fit">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <CategoriesListBodyRow
                    key={category.id}
                    category={category}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
