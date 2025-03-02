import { prisma } from "@/prisma/client";
import PostActions from "./PostActions";

import Pagination from "@/app/components/Pagination";
import PostsGrid, { PostQuery } from "./PostsGrid";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: PostQuery;
}
const PostsPage = async ({ searchParams }: Props) => {
  searchParams = await searchParams; // in next js need to await params
  const { search, page } = searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 16;

  const where = search
    ? {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
        ],
      }
    : {};

  const posts = await prisma.post.findMany({
    where,
    orderBy: {
      createdAt: "desc", // Sort by newest first (use 'asc' for oldest first)
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const postCount = await prisma.post.count({});

  return (
    <Flex direction={"column"} gap={"3"}>
      <PostActions />
      <PostsGrid posts={posts} searchParams={searchParams} />
      <Pagination
        itemCount={postCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </Flex>
  );
};

export default PostsPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all of project issues",
};
