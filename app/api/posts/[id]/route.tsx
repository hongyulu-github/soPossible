import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const trueParams = await params;
  const postId = trueParams.id;
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json("Invalid issue", { status: 404 });

  await prisma.post.delete({
    where: { id: postId },
  });

  return NextResponse.json({});
}
