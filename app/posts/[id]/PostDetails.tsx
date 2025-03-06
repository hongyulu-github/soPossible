import { getTimeSince } from "@/app/utils";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { Post } from "@prisma/client";
import { Avatar, Box, Flex, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
import DeleteOrSaveBtn from "./DeleteOrSaveBtn";

const PostDetails = async ({ post }: { post: Post }) => {
  const user = await prisma.user.findUnique({ where: { id: post.userId } });
  const session = await auth();
  const isMyPost = user?.email === session?.user?.email;

  return (
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
        {session && <DeleteOrSaveBtn isMyPost={isMyPost} postId={post.id} />}
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
  );
};

export default PostDetails;
