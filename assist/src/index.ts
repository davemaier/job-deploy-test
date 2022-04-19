import { PrismaClient } from "@prisma/client";

import { seedRunner } from "../prisma/seeds/seedRunner";
import { AmazonConnection, env, isDev } from "./utils";

async function start() {
  const prisma = new PrismaClient();

  const isDbEmpty = !(await prisma.region.findFirst());

  if (isDev && isDbEmpty) {
    await seedRunner(prisma);
  }

  const region = await prisma.region.findFirst();

  if (region) {
    console.log(
      `Region: ${region.name} was found! Everything seems to work fine!`
    );
  } else {
    console.log(`No region was found! Thats not good.`);
  }
}

start();
