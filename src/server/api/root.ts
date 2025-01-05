import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { categoriesRouter } from "./routers/categories";
import { optionsRouter } from "./routers/options";
import { reasonForReferalRouter } from "./routers/reason-for-referal";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  options: optionsRouter,
  reasonForReferal: reasonForReferalRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
