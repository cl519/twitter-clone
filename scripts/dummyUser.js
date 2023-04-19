import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

// dummy user ID: 643835540f2f8729b5d9556c

async function main() {
  // Create a dummy user
  const user = await prisma.user.create({
    data: {
      name: "Dummy User",
      username: "dummyuser",
      email: "dummyuser@example.com",
    },
  });
  console.log(`Created user with id: ${user.id}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
