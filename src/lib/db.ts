import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/generated/prisma/client";
import { env } from "@/lib/env";

const adapter = new PrismaNeon({
  connectionString: env.DATABASE_URL,
});

const globalForPrism = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrism.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrism.prisma = prisma;
}

export { prisma };
