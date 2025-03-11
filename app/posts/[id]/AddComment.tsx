"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddComment = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const onComment = async () => {
    const comment = { text: newComment, postId: postId };
    await axios.post("/api/comments", comment);
    router.refresh();
    setNewComment("");
  };

  return (
    <Flex justify={"between"}>
      <input
        placeholder="Reply to comment…"
        className="w-200"
        value={newComment}
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
      />
      <Button onClick={() => onComment()}>
        <PaperPlaneIcon />
      </Button>
    </Flex>
  );
};

export default AddComment;
