import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const client = new PrismaClient();

export const GET = async () => {
  try {
    const existingUser = await client.user.findUnique({
      where: { email: "asd" },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists.",
      });
    }

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
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      error: "Internal server error.",
    });
  }
};
