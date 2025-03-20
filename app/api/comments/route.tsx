import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const commentSchema = z.object({
  text: z.string().min(1).max(255),
  postId: z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const userEmail = session.user?.email;
  const user = await prisma.user.findUnique({ where: { email: userEmail! } });

  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newComment = await prisma.comment.create({
    data: {
      postId: body.postId,
      userId: user.id,
      text: body.text,
    },
  });
  return NextResponse.json(newComment, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get("id");

  if (!commentId) {
    return NextResponse.json({ error: "Missing comment ID" }, { status: 400 });
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    return NextResponse.json({ error: "No comment found" }, { status: 404 });
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  return NextResponse.json({ message: "Comment deleted successfully" });
}
