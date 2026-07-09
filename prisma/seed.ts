import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_SEED_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 12);

  const existing = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });

  if (!existing) {
    await prisma.adminUser.create({
      data: {
        username: "admin",
        passwordHash,
      },
    });
    console.log(`Admin user created (username: admin)`);
  } else {
    console.log(`Admin user already exists`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
