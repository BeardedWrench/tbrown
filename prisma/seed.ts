import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: "admin" },
      { name: "editor" },
      { name: "viewer" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("✅ Roles seeded");
    return prisma.$disconnect();
  })
  .catch((err) => {
    console.error("❌ Seed error:", err);
    return prisma.$disconnect();
  });