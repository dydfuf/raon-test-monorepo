"use client";

import { TodoList } from "./type";
import { Callout, Flex } from "@radix-ui/themes";
import { CheckCircledIcon, MinusCircledIcon } from "@radix-ui/react-icons";

interface Props extends TodoList {}

export default function ListItem({ label, status, description }: Props) {
  return (
    <Flex direction="column" gap={"5"} align="center">
      <Callout.Root
        size="2"
        color={status === "DONE" ? "green" : "gray"}
        className="w-full !items-center"
      >
        <Callout.Icon>
          {status === "DONE" && <CheckCircledIcon height={24} width={24} />}
          {status === "TODO" && <MinusCircledIcon height={24} width={24} />}
        </Callout.Icon>
        <Callout.Text
          color={status === "DONE" ? "green" : "gray"}
          size={"5"}
          weight={"bold"}
        >
          {label}
          <Callout.Text className="block" size={"4"} weight={"medium"}>
            {description}
          </Callout.Text>
        </Callout.Text>
      </Callout.Root>
    </Flex>
  );
}
