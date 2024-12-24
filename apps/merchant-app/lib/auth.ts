import db from "@repo/db/client";
import { type NextAuthOptions } from "next-auth"; // Added import
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Typed authOptions
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Removed profile, email, credentials
      if (!user?.email || !account?.provider) {
        return false;
      }

      try {
        await db.merchant.upsert({
          select: {
            id: true,
          },
          where: {
            email: user.email,
          },
          create: {
            email: user.email,
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
          },
          update: {
            name: user.name,
            auth_type: account.provider === "google" ? "Google" : "Github", // Use a prisma type here
          },
        });
      } catch (error) {
        console.error("Upsert failed:", error);
        return false;
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
