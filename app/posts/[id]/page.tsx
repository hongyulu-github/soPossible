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

  const getTimeSincePost = () => {
    const now = new Date();
    const postDate = post.createdAt;
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000
    );

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const count = Math.floor(diffInSeconds / unit.seconds);
      if (count >= 1) {
        return `${count} ${unit.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

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
            <Text>{getTimeSincePost()}</Text>
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
        <Box>comentarios</Box>
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
