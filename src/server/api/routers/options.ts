import { optionsTable } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const optionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.optionsTable.findMany({
      with: {
        category: true,
      },
    });
  }),

  getOne: publicProcedure
    .input(z.object({ optionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query.optionsTable.findFirst({
        where: eq(optionsTable.id, input.optionId),
        with: {
          category: true,
          reasonForReferal: true,
        },
      });

      if (!result) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Option not found" });
      }

      return result;
    }),

  create: protectedProcedure
    .input(
      z.object({
        categoryId: z.number(),
        data: z.object({
          title: z.string(),
        }),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(optionsTable).values({
        title: input.data.title,
        categoryId: input.categoryId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({ title: z.string() }),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(optionsTable)
        .set({
          title: input.data.title,
        })
        .where(eq(optionsTable.id, input.id));
    }),

  delete: protectedProcedure
    .input(
      z.object({
        categoryId: z.number(),
        optionid: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(optionsTable)
        .where(
          and(
            eq(optionsTable.id, input.optionid),
            eq(optionsTable.categoryId, input.categoryId),
          ),
        );
    }),
});
