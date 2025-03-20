import { prisma } from "@/prisma/client";
import { Flex, Separator } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import CommentList from "./CommentList";
import PostDetails from "./PostDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchPost = (postId: string) =>
  prisma.post.findUnique({
    where: { id: postId },
  });

const PageDetailPage = async ({ params }: Props) => {
  const trueParams = await params;
  const postId = trueParams.id;
  const post = await fetchPost(postId);
  if (!post) notFound();

  return (
    <Flex
      gap={"5"}
      height={"max-content"}
      p={"4"}
      direction={{ initial: "column", sm: "row" }}
    >
      <PostDetails post={post} />
      <Separator orientation={{ sm: "horizontal", md: "vertical" }} size="3" />
      <Flex direction={"column"}>
        <CommentList post={post} />
      </Flex>
    </Flex>
  );
};

export default PageDetailPage;

export async function generateMetadata({ params }: Props) {
  const trueParams = await params;
  const post = await fetchPost(trueParams.id);
  return {
    title: post?.title,
    description: "Details of post " + post?.title,
  };
}
