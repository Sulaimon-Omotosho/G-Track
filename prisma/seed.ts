// const { UserRole } = require('@prisma/client')
const { faker } = require('@faker-js/faker')
import prisma from '../lib/db'

enum UserRole {
  USER = 'USER',
  DISTRICT = 'DISTRICT',
  COMMUNITY = 'COMMUNITY',
  ZONAL = 'ZONAL',
  CELL = 'CELL',
}

const data = {
  Bethel: ['Titilayo Soetan', 'Gbagada Hospital Road', 'Dada Olatunji'],
  'Royal Priesthood': ['Soluyi', 'Atunrase', 'Medina', 'Powerline'],
  'Sun Rise': [
    'Bariga',
    'Baale',
    'Odunsi',
    'Ilaje',
    'Laide',
    'Temple',
    'Igbo Igunnu',
    'Ladilak',
    'Muritala',
    'New Garage',
    'Roundabout',
  ],
  Praise: ['Ifakp', 'Sawmil', 'Glory Estate', 'Iyana Hospital', 'Josland'],
  'El-Rois Nest': [
    'Obanikoro',
    'Alabi',
    'Charlie Boy',
    'Gbagada',
    'Estate Phase 2',
  ],
  Anagkazo: [
    'Oworo Road',
    'Papa',
    'Olojojo',
    'L & K',
    'Car Wash',
    'Miyaki',
    'Ekore',
    'Olopomeji',
  ],
  'Next Level': [
    'Palmgroove',
    'Pedro',
    'Apata',
    'Abule-Ijesha',
    'Abule-Oja',
    'Fola Agoro',
    'Bajulaye',
    'Akoka',
  ],
  'Harvesters Global': ['Ogudu', 'Ojota', 'Ketu', 'Alapere'],
  Harmony: [
    'Harmony Estate',
    'Yetunde Brown',
    'Tunde Hassan',
    'Paul Odulaja',
    'Ogundele Street',
    'Glory Estate',
    'Walter Syphier',
    'Ilawe Street',
  ],
  Online: ['Trailblazers', 'Light Bearers'],
}

const createUser = async (role: UserRole) => {
  const uuid = faker.string.uuid()
  return prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: `${uuid}@example.com`,
      phone: faker.phone.number(),
      hashedPassword: faker.string.uuid(),
      role,
      birthDate: faker.date.birthdate(),
    },
  })
}

async function main() {
  for (const [districtName, communities] of Object.entries(data)) {
    // Create district pastor
    const districtPastor = await createUser(UserRole.DISTRICT)

    // Create district
    const district = await prisma.district.create({
      data: {
        name: districtName,
        pastorId: districtPastor.id,
        campus: 'Gbagada',
      },
    })

    for (const communityName of communities) {
      // Create community pastor
      const communityPastor = await createUser(UserRole.COMMUNITY)

      // Create community
      const community = await prisma.community.create({
        data: {
          name: communityName,
          districtId: district.id,
          pastorId: communityPastor.id,
        },
      })

      const zoneCount = faker.number.int({ min: 2, max: 4 })

      for (let z = 0; z < zoneCount; z++) {
        const zoneName = `Zone ${z + 1} - ${communityName}`
        const zonalLeader = await createUser(UserRole.ZONAL)

        const zone = await prisma.zone.create({
          data: {
            name: zoneName,
            communityId: community.id,
            leaderId: zonalLeader.id,
          },
        })

        const cellCount = faker.number.int({ min: 3, max: 5 })
        for (let c = 0; c < cellCount; c++) {
          const cellName = `Cell ${c + 1} - ${zoneName}`
          const cellLeader = await createUser(UserRole.CELL)

          const cell = await prisma.cell.create({
            data: {
              name: cellName,
              zoneId: zone.id,
              leaderId: cellLeader.id,
            },
          })

          const memberCount = faker.number.int({ min: 3, max: 8 })
          for (let m = 0; m < memberCount; m++) {
            const member = await createUser(UserRole.USER)
            await prisma.user.update({
              where: { id: member.id },
              data: { cellId: cell.id },
            })
          }
        }
      }
    }
  }

  console.log('🌱 Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
