import { Metadata } from "next";
import React, { PropsWithChildren } from "react";

export const metadata: Metadata = {
  authors: [{ name: "raon.c" }, { name: "최용열" }],
};

export default function layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
