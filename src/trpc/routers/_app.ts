import { createTRPCRouter } from "@/trpc/init";
import { generationsRouter } from "@/trpc/routers/generations";
import { voicesRouter } from "@/trpc/routers/voices";

export const appRouter = createTRPCRouter({
  voices: voicesRouter,
  generations: generationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
