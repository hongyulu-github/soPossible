import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueBtn from "./DeleteIssueBtn";
import EditIssueBtn from "./EditIssueBtn";
import PostDetails from "./PostDetails";
import Image from "next/image";
import { StarIcon } from "@radix-ui/react-icons";
import CommentList from "./CommentList";
import { getTimeSince } from "@/app/utils";

interface Props {
  params: { id: string };
}

const fetchPost = (postId: string) =>
  prisma.post.findUnique({
    where: { id: postId },
  });

const PageDetailPage = async ({ params }: Props) => {
  const postId = params.id;
  const post = await fetchPost(postId);
  if (!post) notFound();
  const session = await auth();

  const user = await prisma.user.findUnique({ where: { id: post.userId } });

  return (
    <Flex gap={"5"} height={"max-content"}>
      <Flex direction={"column"} gap={"3"} width={"400px"}>
        <Flex justify={"between"} align={"center"}>
          <Flex gap={"2"}>
            <Avatar
              fallback={user!.name!}
              src={user!.image!}
              radius="full"
              size={"2"}
            />
            <Text>{user!.name}</Text>
            <Text>{getTimeSince(post.createdAt)}</Text>
          </Flex>
          <StarIcon />
        </Flex>
        <Box position={"relative"} width={"400px"} height={"400px"}>
          <Image
            src={post.image!}
            alt={post.title}
            fill={true}
            style={{ objectFit: "cover", borderRadius: "10px" }}
          />
        </Box>
        <Text as="p" size="3">
          <Strong>{post.title}</Strong> {post.description}
        </Text>
      </Flex>
      <Separator orientation="vertical" size="3" />
      <Flex direction={"column"}>
        <CommentList post={post} />
      </Flex>
    </Flex>
  );
};

export default PageDetailPage;

export async function generateMetadata({ params }: Props) {
  const post = await await fetchPost(params.id);
  return {
    title: post?.title,
    description: "Details of post " + post?.title,
  };
}
