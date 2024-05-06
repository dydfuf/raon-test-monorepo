import Image from "next/image";
import { Anton } from "next/font/google";
import Link from "next/link";
import { Button, Flex, Text } from "@radix-ui/themes";
import SwitchTheme from "./SwitchTheme.client";
import { cn } from "@raonc/ui/lib/utils";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
  return (
    <Flex
      asChild
      height={"64px"}
      align={"center"}
      px={"4"}
      gap={"3"}
      style={{ backgroundColor: "var(--gray-a1)" }}
    >
      <header>
        <Link href={"/"}>
          <button className="w-40 h-40 flex items-center justify-center object-contain">
            <Image src="/MainLogo.svg" width={40} height={40} alt="MainLogo" />
          </button>
        </Link>
        <Link href={"/"}>
          <Text
            className={cn(anton.className, "hidden mobile:block")}
            size={"7"}
          >
            Raon.dev
          </Text>
        </Link>
        <Flex align={"center"} width={"100%"} gap={"5"} justify={"end"}>
          <SwitchTheme />
          <Link href="/todo" className="shrink-0">
            <Button variant="ghost" color="jade" size={"3"}>
              <Text weight={"bold"}>TODO</Text>
            </Button>
          </Link>
          <Link href="/aboutme" className="shrink-0">
            <Button variant="ghost" color="jade" size={"3"}>
              <Text weight={"bold"}>About Me</Text>
            </Button>
          </Link>
        </Flex>
      </header>
    </Flex>
  );
}
