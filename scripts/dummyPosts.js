import pkg from "@prisma/client";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function createDummyPosts(userId) {
  const posts = [];

  for (let i = 0; i < 100; i++) {
    const post = await prisma.post.create({
      data: {
        body: `dummy post ${i + 1}`,
        userId,
      },
    });

    posts.push(post);
  }

  console.log(`Created ${posts.length} dummy posts for user ${userId}`);

  return posts;
}

const userId = "643835540f2f8729b5d9556c";

createDummyPosts(userId)
  .catch((e) => console.log(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
