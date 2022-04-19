import { PrismaClient, User } from '@prisma/client';
import faker from 'faker';

import { env } from '../../src/utils';
import { SeedAssistanceTypesType } from './assistanceTypes';

faker.locale = 'de_AT';
faker.seed(234);

export type UsersType = {
  thomasMaurer: User;
  dorisKribernig: User;
  sabineMagerl: User;
};

export async function seedUsers(
  prisma: PrismaClient,
  assistanceTypes: SeedAssistanceTypesType,
): Promise<UsersType> {
  const subs = {
    dKibernig:
      env.nodeEnv === 'production'
        ? 'auth0|608406b038082e006c564e56'
        : env.nodeEnv === 'stage'
        ? 'auth0|5f87eed0ed9eea0070abe4ad'
        : 'auth0|61f1549ec77bfc0068fd9c3b',
    sMagerl:
      env.nodeEnv === 'production'
        ? 'google-oauth2|103990181741673662617'
        : env.nodeEnv === 'stage'
        ? 'google-oauth2|103990181741673662617'
        : 'auth0|61f154c7f588c40069db332a',
    tMaurer:
      env.nodeEnv === 'production'
        ? 'auth0|5f917eeef3b793006ff061dd'
        : env.nodeEnv === 'stage'
        ? 'google-oauth2|106433863998860442359'
        : 'auth0|61f154e7fa80f50069a9e259',
  };

  const dorisKribernig = await prisma.user.upsert({
    create: {
      client: {
        create: {
          decree: false,
          id: 'id_client_doris_kribernig',
        },
      },
      email: 'dkribernig1999@gmail.com',
      id: 'id_user_doris_kribernig',
      profile: {
        create: {
          bio: faker.lorem.sentence(),
          coverPhoto: {
            create: {
              alt: 'Cover Photo',
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAYI/8QAIhAAAgIBBAIDAQAAAAAAAAAAAQIDBAUABhESITEyUWGx/8QAFAEBAAAAAAAAAAAAAAAAAAAABf/EABsRAAIBBQAAAAAAAAAAAAAAAAACAQMEBREx/9oADAMBAAIRAxEAPwAuzcLktxXLlix3MFSXo57fEA8AD99k6kM5mL9LN5CrG0nSCxJEvPHPCsQP5rRu3KdaCOJIK8MaOQ7KiABm+yB7OmWtr4CazLLLg8W8juWZ2qRksSfJJ48nRq2idH3ydTcwf//Z',
              height: 200,
              src: 'default-image.jpg',
              width: 200,
            },
          },
          firstName: 'Doris',
          gender: 'FEMALE',
          lastName: 'Kribernig',
          photo: {
            create: {
              alt: 'Profilbild',
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwYI/8QAJRAAAwABAgQHAQAAAAAAAAAAAQIDBAARBQYHIRMUIjFCUVJh/8QAFgEBAQEAAAAAAAAAAAAAAAAABQAB/8QAIBEAAQUAAAcAAAAAAAAAAAAAAAECAwQRMUFRYbHB8P/aAAwDAQACEQMRAD8AtOpfFop1EhkS4xCdsRorAeJ6ZHfdwwH3v3/mhrjLS2mLEmt8dfuYrVmjbCrHd99DlN1rNaSYPNwGVlO4IPsRpkKMSZLGlnZyWY2puT3J1hu5wG7lfLyRy1wkDItt5SPzP4Goj//Z',
              height: 200,
              src: 'DorisKribernig_UrdO3uIyypw.png',
              width: 200,
            },
          },
        },
      },
      requirements: {
        create: {
          assistanceTypes: {
            connect: [
              {
                id: assistanceTypes.familyReliefService.id,
              },
              {
                id: assistanceTypes.personalAssistance.id,
              },
            ],
          },
          availability: ['MORNING', 'NIGHT'],
          features: {
            connect: [
              { id: 'id_driving_licence' },
              { id: 'id_car' },
              { id: 'id_nonsmoker' },
            ],
          },
          languages: ['DE', 'EN', 'FR'],
        },
      },
      sub: subs.dKibernig,
      username: 'dkribernig',
    },
    include: { client: true },
    update: {},
    where: { sub: subs.dKibernig },
  });

  const thomasMaurer = await prisma.user.upsert({
    create: {
      assistant: {
        create: {
          assistantRegions: {
            create: [
              {
                assistanceType: {
                  connect: {
                    id: assistanceTypes.personalAssistance.id,
                  },
                },
                region: {
                  connect: {
                    id: 'Q13298',
                  },
                },
              },
              {
                assistanceType: {
                  connect: {
                    id: assistanceTypes.personalAssistance.id,
                  },
                },
                region: {
                  connect: {
                    id: 'Q672475',
                  },
                },
              },
              {
                assistanceType: {
                  connect: {
                    id: assistanceTypes.personalAssistance.id,
                  },
                },
                region: {
                  connect: {
                    id: 'Q660325',
                  },
                },
              },
            ],
          },
          connections: {
            create: {
              client: { connect: { id: dorisKribernig.client?.id } },
            },
          },
          employment: 'SELF_EMPLOYED',
          id: 'id_ass_thomas_maurer',
        },
      },
      email: 'tmaurer1999@gmail.com',
      id: 'id_user_thomas_maurer',
      profile: {
        create: {
          address: {
            create: {
              address: 'Beispielweg 6',
              city: 'Graz',
              zip: '8010',
            },
          },
          availability: ['MORNING', 'NOON', 'AFTERNOON'],
          bio: faker.lorem.sentence(),
          coverPhoto: {
            create: {
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQYH/8QAIBABAAECBwEBAAAAAAAAAAAAAQIDBQAEERMhIjE0Yf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAIREAAAUEAgMAAAAAAAAAAAAAAQIDBREABiExBGEiQYH/2gAMAwEAAhEDEQA/AHctdCvdIWuvWntRhHcjUEpyiR7CHrq+Yuaba9uPxx4OrThqfmMguSxzmVlFSUqvKeveWC1ZKqq8q4NrthBy4KZxUMQd+IxM9a9VUupxTb1yJgiBsbGJx87r/9k=',
              height: 200,

              src: 'joshua-coleman-WyoGCoHMrEI-unsplash_RcUeOc5ZC5e.jpg',
              width: 200,
            },
          },
          features: { connect: [{ id: 'id_nonsmoker' }, { id: 'id_pets' }] },
          firstName: 'Thomas',
          gender: 'MALE',
          lastName: 'Maurer',
          photo: {
            create: {
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAJBAAAgEDBAAHAAAAAAAAAAAAAQIDAAQRBQYTIRJBUVJhkaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAgQDEhETIaHRIlJTYZH/2gAMAwEAAhEDEQA/ACIm2PaEW6X15IkgPckILRY8s+Lv0qjIkOLbrNfSPSp9Vod9UQi2OwBOp3ik9kcQ6/aIZR8R25SMk9434WU6mqqJGVQCFzkD5qdEqOJAJTptNoxICD5H97fdVFLX/9k=',
              height: 200,

              src: 'ThomasMaurer_BIrYFPH3-.png',
              width: 200,
            },
          },
          schedule: 'FLEXIBLE',
        },
      },
      sub: subs.tMaurer,
      username: 'TommiMaurer',
    },
    include: { assistant: true },
    update: {},
    where: { sub: subs.tMaurer },
  });

  const sabineMagerl = await prisma.user.upsert({
    create: {
      assistant: {
        create: {
          assistantRegions: {
            create: [
              {
                assistanceType: {
                  connect: {
                    id: assistanceTypes.personalAssistance.id,
                  },
                },
                region: {
                  connect: {
                    id: 'Q13298',
                  },
                },
              },
              {
                assistanceType: {
                  connect: {
                    id: assistanceTypes.familyReliefService.id,
                  },
                },
                region: {
                  connect: {
                    id: 'Q13298',
                  },
                },
              },
            ],
          },
          connections: {
            create: {
              client: { connect: { id: dorisKribernig.client?.id } },
            },
          },
          employment: 'EMPLOYED',
          id: 'id_ass_sabine_magerl',
        },
      },
      email: 'smagerl1999@gmail.com',
      id: 'id_user_sabine_magerl',
      profile: {
        create: {
          availability: ['NOON', 'AFTERNOON', 'NIGHT'],
          bio: faker.lorem.sentence(),
          coverPhoto: {
            create: {
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAJBAAAgEDBAAHAAAAAAAAAAAAAQIDAAQRBQYTIRJBUVJhkaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAgQDEhETIaHRIlJTYZH/2gAMAwEAAhEDEQA/ACIm2PaEW6X15IkgPckILRY8s+Lv0qjIkOLbrNfSPSp9Vod9UQi2OwBOp3ik9kcQ6/aIZR8R25SMk9434WU6mqqJGVQCFzkD5qdEqOJAJTptNoxICD5H97fdVFLX/9k=data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAJBAAAgEDBAAHAAAAAAAAAAAAAQIDAAQRBQYTIRJBUVJhkaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAgQDEhETIaHRIlJTYZH/2gAMAwEAAhEDEQA/ACIm2PaEW6X15IkgPckILRY8s+Lv0qjIkOLbrNfSPSp9Vod9UQi2OwBOp3ik9kcQ6/aIZR8R25SMk9434WU6mqqJGVQCFzkD5qdEqOJAJTptNoxICD5H97fdVFLX/9k=',
              height: 200,

              src: 'my_file_name_6VPp9tlns.jpg',
              width: 200,
            },
          },
          features: {
            connect: [{ id: 'id_computer' }, { id: 'id_stressable' }],
          },
          firstName: 'Sabine',
          gender: 'FEMALE',
          lastName: 'Magerl',
          photo: {
            create: {
              blurDataURL:
                'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAJBAAAgEDBAAHAAAAAAAAAAAAAQIDAAQRBQYTIRJBUVJhkaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAgQDEhETIaHRIlJTYZH/2gAMAwEAAhEDEQA/ACIm2PaEW6X15IkgPckILRY8s+Lv0qjIkOLbrNfSPSp9Vod9UQi2OwBOp3ik9kcQ6/aIZR8R25SMk9434WU6mqqJGVQCFzkD5qdEqOJAJTptNoxICD5H97fdVFLX/9k=',
              height: 200,

              src: 'SabineMagerl_XDq7O0z_F.png',
              width: 200,
            },
          },
          schedule: 'REGULARLY',
        },
      },
      sub: subs.sMagerl,
      username: 'Sabsi',
    },
    include: { assistant: true },
    update: {},
    where: { sub: subs.sMagerl },
  });

  await Promise.all(
    Array.from({ length: 10 }, async () => {
      const sub = `generated|${faker.random.alphaNumeric(16)}`;
      const gender = faker.datatype.number(2);
      const firstName = faker.name.firstName(gender);
      const lastName = faker.name.lastName(gender);
      const username = faker.internet.userName(firstName, lastName);

      await prisma.user.upsert({
        create: {
          assistant: {
            create: {
              employment: faker.random.arrayElement([
                'EMPLOYED',
                'SELF_EMPLOYED',
              ]),
            },
          },
          email: faker.internet.email(firstName, lastName),
          profile: {
            create: {
              bio: faker.lorem.sentence(),
              firstName,
              gender:
                gender === 0 ? 'MALE' : gender === 1 ? 'FEMALE' : undefined,
              lastName,
              photo: {
                create: {
                  blurDataURL:
                    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDAREAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQQH/8QAJBAAAgEDBAAHAAAAAAAAAAAAAQIDAAQRBQYTIRJBUVJhkaH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACMRAAEDAgUFAAAAAAAAAAAAAAEAAgQDEhETIaHRIlJTYZH/2gAMAwEAAhEDEQA/ACIm2PaEW6X15IkgPckILRY8s+Lv0qjIkOLbrNfSPSp9Vod9UQi2OwBOp3ik9kcQ6/aIZR8R25SMk9434WU6mqqJGVQCFzkD5qdEqOJAJTptNoxICD5H97fdVFLX/9k=',
                  height: 200,

                  src: 'avatar-placeholder_09pj213Po.jpg',
                  width: 200,
                },
              },
            },
          },
          sub,
          username,
        },
        update: {},
        where: { sub },
      });
    }),
  );

  return { dorisKribernig, sabineMagerl, thomasMaurer };
}
