import { getTimeSince } from "@/app/utils";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { Comment } from "@prisma/client";
import { Box, Flex, Separator, Strong, Text } from "@radix-ui/themes";
import DeleteCommentBtn from "./DeleteCommentBtn";

export const CommentItem = async ({ comment }: { comment: Comment }) => {
  const user = await prisma.user.findUnique({ where: { id: comment.userId } });
  const session = await auth();
  const isMyComment = session?.user?.email === user?.email;

  return (
    <Box className="group relative">
      <Flex key={comment.id} justify={"between"} direction={"column"}>
        <Text wrap={"pretty"} color="gray">
          <Strong>{user!.name}</Strong> {comment.text}
        </Text>

        <Flex align={"center"} gap={"3"}>
          <Text wrap={"nowrap"} color="gray">
            {getTimeSince(comment.createdAt)}
          </Text>
          {isMyComment && <DeleteCommentBtn commentId={comment.id} />}
        </Flex>
      </Flex>
      <Separator orientation={"horizontal"} size="3" className="mb-3" />
    </Box>
  );
};
