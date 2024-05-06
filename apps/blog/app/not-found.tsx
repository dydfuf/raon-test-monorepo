import { cn } from "@raonc/ui/lib/utils";
import ContentCard from "../components/ContentCard";
import { parseMarkdownMetadata } from "../utils/parseMarkdownMetadata";
import { getPostByName, getPostNameList } from "../utils/post";
import { Flex, Text } from "@radix-ui/themes";
import readingTime from "reading-time";

export default function PostNotFoundPage() {
  const recentPost = getPostNameList().map((postName) => ({
    name: postName,
    content: getPostByName(postName ?? ""),
  }))[0];

  const { name, content = "" } = recentPost || {};
  const { date, description, category, title } = parseMarkdownMetadata(content);
  const stats = readingTime(content);

  return (
    <Flex
      className={cn("w-full h-full flex flex-col items-center justify-center")}
      align={"center"}
      justify="center"
      px={"4"}
    >
      <Text size={"7"} weight={"bold"}>
        해당 페이지를 찾지 못했어요. 😭
      </Text>
      <Text size={"5"} weight={"bold"} my={"4"}>
        아래 아티클 읽어보시는건 어때요?
      </Text>
      <ContentCard
        title={title ?? ""}
        timeToRead={stats.text}
        description={description ?? ""}
        releaseDate={date ?? ""}
        categories={category?.split(",") ?? []}
        to={`/posts/${name}`}
      />
    </Flex>
  );
}
