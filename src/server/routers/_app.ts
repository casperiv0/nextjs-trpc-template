import { t } from "../trpc";
import { userRouter } from "./user-router";

export const appRouter = t.router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
