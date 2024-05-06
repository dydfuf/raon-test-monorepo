import { Flex, Text } from "@radix-ui/themes";
import ListItem from "./ListItem";
import { TodoList } from "./type";

interface Props {
  lists: TodoList[];
}

export default function Todo({ lists }: Props) {
  const done = lists.filter((todo) => todo.status === "DONE");
  const todo = lists.filter((todo) => todo.status === "TODO");

  return (
    <>
      <Flex gap={"4"}>
        <Text>
          DONE : <Text weight={"bold"}>{done.length}</Text>
        </Text>
        <Text>
          TODO : <Text weight={"bold"}>{todo.length}</Text>
        </Text>
      </Flex>
      <Flex direction={"column"} gap={"3"} pt="4">
        {[...todo, ...done].map((todoList, idx) => (
          <ListItem key={`${idx}-${todoList.label}`} {...todoList} />
        ))}
      </Flex>
    </>
  );
}
