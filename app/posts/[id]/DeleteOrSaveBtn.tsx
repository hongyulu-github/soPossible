"use client";
import { StarIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteOrSaveBtn = ({
  isMyPost,
  postId,
}: {
  isMyPost: boolean;
  postId: string;
}) => {
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="hover:cursor-pointer">
      {isMyPost ? <TrashIcon onClick={handleDeletePost} /> : <StarIcon />}
    </div>
  );
};

export default DeleteOrSaveBtn;
