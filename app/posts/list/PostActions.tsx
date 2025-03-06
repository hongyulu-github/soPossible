import React from "react";
import { Flex } from "@radix-ui/themes";
import PostSearch from "./PostSearch";

const PostActions = () => {
  return (
    <Flex justify={"between"}>
      <PostSearch />
    </Flex>
  );
};

export default PostActions;
