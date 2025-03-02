import { Post } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import Markdown from "react-markdown";

const PostDetails = ({ post }: { post: Post }) => {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>{post.title}</Heading>
      <Flex gap={"3"} align="center">
        <p>{post.createdAt.toDateString()}</p>
      </Flex>
      <Card>
        <Markdown className={"prose"}>{post.description}</Markdown>
      </Card>
    </Flex>
  );
};

export default PostDetails;
