import { getTimeSince } from "@/app/utils";
import { prisma } from "@/prisma/client";
import { Comment, Post } from "@prisma/client";
import { Box, Flex, Strong, Text } from "@radix-ui/themes";
import React from "react";

const CommentItem = async ({ comment }: { comment: Comment }) => {
  const user = await prisma.user.findUnique({ where: { id: comment.userId } });
  return (
    <Flex key={comment.id} justify={"between"}>
      <Text wrap={"balance"}>
        <Strong>{user!.name}</Strong> {comment.text}
      </Text>
      <Text wrap={"nowrap"} color="gray">
        {getTimeSince(comment.createdAt)}
      </Text>
    </Flex>
  );
};

const CommentList = async ({ post }: { post: Post }) => {
  const { id: postId } = post;
  const commentList = await prisma.comment.findMany({
    where: { postId: postId },
  });

  return (
    <Box width={"300px"}>
      <Flex>
        {commentList.map((comment) => (
          <Box key={comment.id} width={"100%"}>
            <CommentItem comment={comment} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default CommentList;
