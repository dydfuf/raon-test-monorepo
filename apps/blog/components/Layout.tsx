import { PropsWithChildren } from "react";
import Header from "./Header";

import { Flex } from "@radix-ui/themes";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Flex direction={"column"} className={`h-screen`}>
      <Header />
      <Flex
        direction={"column"}
        className="flex-1 overflow-auto"
        id="scrollEl"
        style={{ backgroundColor: "var(--gray-a1)" }}
      >
        <main className="flex-1">{children}</main>
      </Flex>
    </Flex>
  );
}
