import { prisma } from "@/prisma/client";
import PostActions from "./PostActions";

import Pagination from "@/app/components/Pagination";
import PostsGrid, { columns, PostQuery } from "./PostsGrid";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: PostQuery;
}
const PostsPage = async ({ searchParams }: Props) => {
  searchParams = await searchParams; // in next js need to await params
  const { orderBy: orderByQuery, page } = searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = 16;
  // const orderBy = columns.map((col) => col.value).includes(orderByQuery)
  //   ? { [orderByQuery]: "asc" }
  //   : undefined;

  const posts = await prisma.post.findMany({
    // orderBy,
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
