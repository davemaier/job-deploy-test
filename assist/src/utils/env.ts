import { z } from "zod";

export const env = z
  .object({
    databaseUrl: z
      .string()
      .refine((value) => value.startsWith("postgresql://"), {
        message: "Invalid postgresql URL",
      }),
    nodeEnv: z.union([
      z.literal("production"),
      z.literal("development"),
      z.literal("stage"),
    ]),
  })
  .parse({
    databaseUrl: process.env.DATABASE_URL,
    nodeEnv: process.env.KUBE_ENV ?? "development",
  });
