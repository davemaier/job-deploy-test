import { PrismaClient } from "@prisma/client";

import { seedRegions } from "./regions";

export async function seedRunner(prisma: PrismaClient): Promise<void> {
  await seedRegions(prisma);
}
