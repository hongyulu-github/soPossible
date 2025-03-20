import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const postId = params.id;
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json("Invalid issue", { status: 404 });

  await prisma.post.delete({
    where: { id: postId },
  });

  return NextResponse.json({});
}
