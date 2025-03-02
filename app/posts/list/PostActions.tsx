import React from "react";

import NewPostBtn from "../new/NewPostBtn";
import { Flex } from "@radix-ui/themes";
import PostSearch from "./PostSearch";

const PostActions = () => {
  return (
    <Flex justify={"between"}>
      <PostSearch />
      <NewPostBtn />
    </Flex>
  );
};

export default PostActions;
