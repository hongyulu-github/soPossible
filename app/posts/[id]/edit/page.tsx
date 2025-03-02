import React from "react";
import IssueForm from "../../components/PostForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) notFound();

  return <IssueForm post={post} />;
};

export default EditIssuePage;
