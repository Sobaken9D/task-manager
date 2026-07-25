import {prisma} from "./prisma-client";
import {todoSeed, usersSeed} from "./seeds";

async function up() {
  await usersSeed();
  await todoSeed();
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "todos" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });