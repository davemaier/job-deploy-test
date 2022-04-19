import { PrismaClient } from '@prisma/client';
import csvtojson from 'csvtojson';

export async function seedRegions(prisma: PrismaClient) {
  const regions = await csvtojson().fromFile('prisma/seeds/regions_at.csv');

  return prisma.region.createMany({ data: regions, skipDuplicates: true });
}

export async function seedMunicipalities(prisma: PrismaClient) {
  const municipalities = await csvtojson().fromFile(
    'prisma/seeds/municipalities_at.csv',
  );

  return prisma.municipality.createMany({
    data: municipalities,
    skipDuplicates: true,
  });
}
