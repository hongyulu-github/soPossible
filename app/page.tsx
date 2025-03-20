import { prisma } from "@/prisma/client";

import Pagination from "@/app/components/Pagination";

import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import PostActions from "./posts/list/PostActions";
import PostsGrid, { PostQuery } from "./posts/list/PostsGrid";
import PrivacyPolicyLink from "./components/PrivacyPolicyLink";

interface Props {
  searchParams: Promise<PostQuery>;
}
const PostsPage = async ({ searchParams }: Props) => {
  const trueSearchParams = await searchParams; // in next js need to await params
  const { search, page } = trueSearchParams;
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
      createdAt: "desc",
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const searchedPosts = await prisma.post.findMany({
    where,
  });

  return (
    <Flex direction={"column"} gap={"3"} className="relative">
      <PostActions />
      <PostsGrid posts={posts} />
      <div className="fixed bottom-10">
        <Pagination
          itemCount={searchedPosts.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
      <PrivacyPolicyLink />
    </Flex>
  );
};

export default PostsPage;

export const metadata: Metadata = {
  title: "soPossible - posts",
  description: "View all of soPossible posts",
};
