import { reasonForReferalTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const reasonForReferalRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        optionId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.reasonForReferalTable.findMany({
        with: {
          option: true,
        },
        where: eq(reasonForReferalTable.optionId, input.optionId),
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        optionId: z.number(),
        data: z.object({
          title: z.string(),
          assistedText: z.string(),
        }),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(reasonForReferalTable).values({
        title: input.data.title,
        assistedText: input.data.assistedText,
        optionId: input.optionId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({ title: z.string(), assistedText: z.string() }),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .update(reasonForReferalTable)
        .set({
          title: input.data.title,
          assistedText: input.data.assistedText,
        })
        .where(eq(reasonForReferalTable.id, input.id));
    }),

  delete: protectedProcedure
    .input(
      z.object({
        optionId: z.number(),
        reasonForReferalId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db
        .delete(reasonForReferalTable)
        .where(
          and(
            eq(reasonForReferalTable.optionId, input.optionId),
            eq(reasonForReferalTable.id, input.reasonForReferalId),
          ),
        );
    }),
});
