import { createRouter } from "../create-router";
import superjson from "superjson";
import { userRouter } from "./user-router";

export const appRouter = createRouter().transformer(superjson).merge("user.", userRouter);

export type AppRouter = typeof appRouter;
