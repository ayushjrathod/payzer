"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { NextUIProvider } from "@nextui-org/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <NextUIProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIProvider>
    </RecoilRoot>
  );
};
