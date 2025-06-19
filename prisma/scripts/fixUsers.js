import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const updated = await prisma.user.updateMany({
    where: { address: null },
    data: { address: 'Unknown' },
  })
  console.log(`${updated.count} users updated with default address`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
