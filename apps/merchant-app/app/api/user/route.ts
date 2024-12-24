import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  await client.user.create({
    data: {
      email: "asd",
      name: "adsads",
      password: "your_password_here",
    },
  });
  return NextResponse.json({
    message: "hi there",
  });
};
