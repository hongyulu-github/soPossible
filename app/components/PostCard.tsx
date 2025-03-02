import { prisma } from "@/prisma/client";
import { Post } from "@prisma/client";
import { Avatar, Box, Card, Flex, Inset, Strong, Text } from "@radix-ui/themes";
import { getUserNameInitials } from "../utils";

interface Props {
  post: Post;
}

const PostCard = async ({ post }: Props) => {
  const { title, description, userId, image, createdAt } = post;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return (
    <Box minWidth={"275px"}>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={image}
            alt={title}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Flex direction={"column"} justify={"between"} minHeight={"140px"}>
          <Text as="p" size="3">
            <Strong>{title}</Strong> {description}
          </Text>
          <Flex justify={"between"} align={"center"}>
            <Text>{createdAt.toDateString()}</Text>
            <Avatar
              size={"1"}
              fallback={getUserNameInitials(user!.name!)}
              src={user!.image!}
            />
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default PostCard;
