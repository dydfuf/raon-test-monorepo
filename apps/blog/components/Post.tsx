import Link from "next/link";
import { ReadTimeResults } from "reading-time";
import Category from "./Category";
import MarkdownRenderer from "./MarkdownRenderer";
import { Button, Flex, Heading, Section, Text } from "@radix-ui/themes";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  post: string;
  metadata: Record<string, string>;
  prev: string;
  next: string;
  stats: ReadTimeResults;
}

export default function Post({ post, metadata, prev, next, stats }: Props) {
  const { title, date, category = "" } = metadata;
  const categories = category.split(",");

  return (
    <Flex direction={"column"} align={"center"} width={"100%"} height={"100%"}>
      <Flex
        direction={"column"}
        px={"5"}
        py={"8"}
        width={"100%"}
        height={"100%"}
        className="max-w-[768px]"
      >
        <Heading size={"9"} weight={"bold"}>
          {title}
        </Heading>
        <Flex align={"center"} gap={"3"} mt="5">
          <Text size={"2"} color="gray" mt={"2"}>
            {`${stats.text} · ${date}`}
          </Text>
        </Flex>
        <Flex justify={"start"} wrap={"wrap"} gap={"2"} mt={"5"}>
          {categories.map((category) => (
            <Category key={category} category={category} />
          ))}
        </Flex>
        <Section py="5">
          <MarkdownRenderer markdownStr={post} />
        </Section>
        <Flex mt="auto" width={"100%"} pt="8">
          {prev && (
            <Link href={`/posts/${prev}`} className="mr-auto">
              <Button color="green" radius="full">
                <ArrowLeftIcon /> <Text weight={"bold"}>{prev}</Text>
              </Button>
            </Link>
          )}
          {next && (
            <Link href={`/posts/${next}`} className="ml-auto">
              <Button color="green" radius="full">
                <Text weight={"bold"}>{next}</Text> <ArrowRightIcon />
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
