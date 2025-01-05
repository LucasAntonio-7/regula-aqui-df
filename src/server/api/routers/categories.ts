import { categoriesTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.categoriesTable.findMany({
      with: {
        options: {
          with: {
            reasonForReferal: true,
          },
        },
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(categoriesTable).values({
        title: input.title,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.number(), title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(categoriesTable)
        .set({
          title: input.title,
        })
        .where(eq(categoriesTable.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(categoriesTable)
        .where(eq(categoriesTable.id, input.id));
    }),
});
