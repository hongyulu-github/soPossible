import { NextRequest, NextResponse } from "next/server";
import postPostSchema from "./schema";
import { prisma } from "../../../prisma/client";

export async function GET(request: NextRequest) {
  console.log(request);
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = postPostSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { title, description, userId, image } = body;

  const user = prisma.user.findUnique({ where: { id: userId } });

  if (!user) return NextResponse.json("User not found", { status: 404 });

  const product = await prisma.post.create({
    data: { title, description, userId, image },
  });

  return NextResponse.json(product, { status: 201 });
}
