import React from "react";
import PostStatusFilter from "./PostStatusFilter";
import NewPostBtn from "../new/NewPostBtn";
import { Flex } from "@radix-ui/themes";

const PostActions = () => {
  return (
    <Flex justify={"between"}>
      {/* <PostStatusFilter /> */}
      <NewPostBtn />
    </Flex>
  );
};

export default PostActions;
