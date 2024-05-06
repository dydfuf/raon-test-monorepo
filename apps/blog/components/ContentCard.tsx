import Link from "next/link";
import Category from "./Category";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  title: string;
  timeToRead: string;
  description: string;
  releaseDate: string;
  categories: string[];
  to: string;
  animate?: boolean;
  index?: number;
}

export default function ContentCard({
  title,
  timeToRead,
  description,
  releaseDate,
  categories,
  to,
  animate = false,
  index,
}: Props) {
  const animateClassname = animate ? "opacity-0 animate-content-fade-up" : "";

  return (
    <Card
      variant={"surface"}
      className={animateClassname}
      style={{ animationDelay: `calc(${index} * 80ms)` }}
    >
      <Flex direction="column" align={"center"} p={"3"} height={"100%"}>
        <Link href={to}>
          <Flex justify={"center"} align={"center"} width={"100%"}>
            <Text size={"6"} weight={"bold"} align={"center"}>
              {title}
            </Text>
          </Flex>
        </Link>
        <Text size={"2"} color="gray" mt={"2"}>
          {`${timeToRead} · ${releaseDate}`}
        </Text>
        <Text size={"3"} color="gray" mt={"3"}>
          {description}
        </Text>
        <Flex gap={"2"} justify={"start"} mt={"auto"} wrap={"wrap"} pt={"4"}>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
