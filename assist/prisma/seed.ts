/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

import { seedRunner } from './seeds/seedRunner';

const prisma = new PrismaClient();

async function seed() {
  seedRunner(prisma);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
