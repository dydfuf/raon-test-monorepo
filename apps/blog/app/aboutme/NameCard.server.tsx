import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function NameCard() {
  return (
    <Link href={`mailto:88dydfuf@naver.com`}>
      <Card mt={"5"} mx="5" style={{ backgroundColor: "var(--grass-a3)" }}>
        <Flex gap={"4"} align={"center"}>
          <Avatar size={"5"} src="/avatar.png" fallback={"R"} />
          <Box>
            <Text as="p" weight={"bold"}>
              최용열 (Raon.c)
            </Text>
            <Text as="p" color="gray">
              88dydfuf@naver.com
            </Text>
          </Box>
        </Flex>
      </Card>
    </Link>
  );
}
