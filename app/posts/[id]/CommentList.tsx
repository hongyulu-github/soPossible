import { prisma } from "@/prisma/client";
import { Post } from "@prisma/client";
import { Box, Flex } from "@radix-ui/themes";
import AddComment from "./AddComment";
import { CommentItem } from "./CommentItem";

const CommentList = async ({ post }: { post: Post }) => {
  const { id: postId } = post;
  const commentList = await prisma.comment.findMany({
    where: { postId: postId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Flex
      width={"400px"}
      height={"600px"}
      direction={"column"}
      justify={"between"}
    >
      <Flex direction={"column"} className="overflow-auto">
        {commentList.map((comment) => (
          <Box key={comment.id} width={"100%"}>
            <CommentItem comment={comment} />
          </Box>
        ))}
      </Flex>
      <AddComment postId={post.id} />
    </Flex>
  );
};

export default CommentList;
