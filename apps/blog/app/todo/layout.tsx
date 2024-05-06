import { Container, Flex } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <Flex direction={"column"} align={"center"} width={"100%"} height={"100%"}>
      <Container
        p={"2"}
        width={"100%"}
        height={"100%"}
        className="max-w-[768px]"
      >
        {children}
      </Container>
    </Flex>
  );
}
