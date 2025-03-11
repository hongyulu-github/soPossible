import { prisma } from "@/prisma/client";

import Pagination from "@/app/components/Pagination";

import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import PostsGrid, { PostQuery } from "./posts/list/PostsGrid";
import PostActions from "./posts/list/PostActions";

interface Props {
  searchParams: PostQuery;
}
const PostsPage = async ({ searchParams }: Props) => {
  searchParams = await searchParams; // in next js need to await params
  const { search, page } = searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 8;

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
    <Flex direction={"column"} gap={"3"} className="relative">
      <PostActions />
      <PostsGrid posts={posts} searchParams={searchParams} />
      <div className="fixed bottom-10">
        <Pagination
          itemCount={postCount}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </Flex>
  );
};

export default PostsPage;

export const metadata: Metadata = {
  title: "soPossible - posts",
  description: "View all of soPossible posts",
};
