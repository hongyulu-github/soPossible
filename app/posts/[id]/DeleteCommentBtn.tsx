"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteCommentBtn = ({ commentId }: { commentId: string }) => {
  const router = useRouter();
  const deleteComment = async (commentId: string) => {
    await axios.delete(`/api/comments`, {
      params: { id: commentId },
    });
    router.refresh();
  };

  return (
    <TrashIcon
      className="hidden group-hover:block"
      onClick={() => deleteComment(commentId)}
    />
  );
};

export default DeleteCommentBtn;
