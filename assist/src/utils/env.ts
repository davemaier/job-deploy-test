import { z } from 'zod';

export const env = z
  .object({
    auth0ClientId: z.string(),
    auth0ClientSecret: z.string(),
    auth0Domain: z.string(),
    awsAccessKeyId: z.string().optional(),
    awsSecretAccessKey: z.string().optional(),
    databaseUrl: z
      .string()
      .refine((value) => value.startsWith('postgresql://'), {
        message: 'Invalid postgresql URL',
      }),
    imageKitFolder: z.string().optional(),
    imageKitPrivateKey: z
      .string()
      .refine((value) => value.startsWith('private'), {
        message: 'Invalid imageKitPrivateKey',
      }),
    imageKitPublicKey: z
      .string()
      .refine((value) => value.startsWith('public'), {
        message: 'Invalid imageKitimageKitPublicKey',
      }),
    imageKitUrlEndpoint: z
      .string()
      .refine((value) => value.startsWith('https://ik.imagekit.io/'), {
        message: 'Invalid databaseUrlimageKitUrlEndpoint',
      }),
    kafkaBrokers: z.array(z.string()),
    nodeEnv: z.union([
      z.literal('production'),
      z.literal('development'),
      z.literal('stage'),
    ]),
    schemaRegistryUrl: z.string().url(),
    searchHostUrl: z.string().url(),
  })
  .parse({
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0ClientSecret: process.env.AUTH0_CLIENT_SECRET,
    auth0Domain: process.env.AUTH0_DOMAIN,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    databaseUrl: process.env.DATABASE_URL,
    imageKitFolder: process.env.IMAGEKIT_FOLDER,
    imageKitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    imageKitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imageKitUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    kafkaBrokers: JSON.parse(process.env.KAFKA_BROKERS ?? '[]'),
    nodeEnv: process.env.KUBE_ENV ?? 'development',
    schemaRegistryUrl: process.env.SCHEMA_REGISTRY_URL,
    searchHostUrl: process.env.SEARCH_HOST_URL,
  });
