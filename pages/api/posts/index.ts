import prisma from "@/libs/prismadb";

import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body; // schema's body field.

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;

      if (userId && typeof userId === "string") {
        console.log("post query with userId");
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        console.log("post query without userId");

        const offset =
          req.query.offset === "undefined" ? undefined : req.query.offset;
        const limit =
          req.query.limit === "undefined" ? undefined : req.query.limit;
        console.log("offset: ", offset, " limit: ", limit);

        if (offset !== undefined && limit !== undefined) {
          posts = await prisma.post.findMany({
            include: {
              user: true,
              comments: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            skip: +offset,
            take: +limit,
          });
        } else {
          posts = await prisma.post.findMany({
            include: {
              user: true,
              comments: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          });
        }
      }

      console.log("posts.length: ", posts.length);

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
