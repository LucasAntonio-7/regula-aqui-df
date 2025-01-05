import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Link from "next/link";

export async function Referal() {
  const categories = await api.categories.getAll();

  return (
    <>
      <div className="flex justify-center py-5">
        <h2 className="text-xl font-semibold">Guias de Encaminhamento</h2>
      </div>
      {categories?.map((category) => (
        <AccordionItem key={category.id} value={`item-${category.id}`}>
          <AccordionTrigger>{category.title}</AccordionTrigger>
          <AccordionContent>
            <div className="grid w-full grid-cols-5 gap-4">
              {category.options?.length ? (
                category.options.map((categoryOption) => (
                  <Link
                    key={categoryOption.id}
                    href={`/option/${categoryOption.id}`}
                  >
                    <Button variant="outline">
                      <p>{categoryOption.title}</p>
                    </Button>
                  </Link>
                ))
              ) : (
                <p>Sem opções de texto assistido</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </>
  );
}
