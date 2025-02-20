import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "../../../prisma/client";

export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // const existingProduct = await prisma.product.findUnique({
  //   where: { name: body.name },
  // });
  // here we cannot check for unique name cos in prisma is not marked as @unique

  // if (existingProduct)
  //   return NextResponse.json(
  //     { error: "Product already exists" },
  //     { status: 400 }
  //   );

  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
