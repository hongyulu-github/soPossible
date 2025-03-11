import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "../../validationSchema";

export async function GET(request: NextRequest) {
  console.log(request);
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({}, { status: 401 });

  const userEmail = session.user?.email;
  const user = await prisma.user.findUnique({ where: { email: userEmail! } });
  if (!user) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = postSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      description: body.description,
      userId: user.id,
      image: body.image,
    },
  });
  return NextResponse.json(newPost, { status: 201 });
}
