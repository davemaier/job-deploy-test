import { PrismaClient } from "@prisma/client";

import { seedMunicipalities, seedRegions } from "./regions";

export async function seedRunner(prisma: PrismaClient): Promise<void> {
  await seedRegions(prisma);
}
