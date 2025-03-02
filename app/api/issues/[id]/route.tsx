import { patchIssueSchema } from "@/app/validationSchema";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await auth();
  // if (!session) return NextResponse.json({}, { status: 401 });
  const issueId = Number(params.id);
  const body = await request.json();

  const { title, description, assignedToUserId } = body;
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return NextResponse.json("Invalid issue", { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: { title, description, assignedToUserId },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });
  const issueId = Number(params.id);
  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) return NextResponse.json("Invalid issue", { status: 404 });

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({});
}
