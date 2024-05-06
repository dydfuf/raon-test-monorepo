import { Flex, Heading, IconButton, Text, Tooltip } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const getUnsplashImage = async () => {
  const res = await fetch(
    `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&collections=${87821}`,
    { next: { revalidate: 60 * 60 } }
  );

  if (!res.ok) {
    throw new Error("Unsplash Image Error");
  }

  const data = await res.json();
  return {
    imageUrl: data.urls.raw,
    htmlLinks: data.links.html,
    username: data.user.username,
  };
};

export default async function MainBanner() {
  const { imageUrl, htmlLinks, username } = await getUnsplashImage();

  return (
    <section className="w-full h-[400px] relative">
      <Image
        src={imageUrl}
        fill
        alt="background"
        style={{ objectFit: "cover" }}
      />
      <Flex
        className="absolute z-10"
        direction={"column"}
        align={"center"}
        justify={"center"}
        width={"100%"}
        height={"100%"}
      >
        <Heading
          as={"h1"}
          align={"center"}
          size={"8"}
          weight={"bold"}
          className="hidden mobile:block whitespace-pre-line text-white"
        >
          {`프론트엔드 개발자\n Raon 의 개발 블로그 입니다`}
        </Heading>
        <Text size={"3"} className="text-white" mt={"4"}>
          주로 Front-end 관련 글을 작성합니다
        </Text>
        <Flex mt={"4"} gap={"4"}>
          {ROUND_IMAGE_LINKS.map((roundImageLink) => (
            <Tooltip key={roundImageLink.alt} content={roundImageLink.tooltip}>
              <Link
                href={roundImageLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
              >
                <IconButton radius={"full"} variant={"surface"} size={"4"}>
                  <Image
                    src={roundImageLink.src}
                    alt={roundImageLink.alt}
                    fill
                  />
                </IconButton>
              </Link>
            </Tooltip>
          ))}
        </Flex>
      </Flex>
      <Flex className="absolute left-12 bottom-12 z-10 text-white">
        <Link href={htmlLinks} target="_blank" rel="noopener noreferrer">
          <Text size={"1"}>{username} by Unsplash</Text>
        </Link>
      </Flex>
      <div className="w-full h-full after:bg-[rgba(26,27,30,.7)] after:absolute after:w-full after:h-full after:top-0 after:left-0 z-0"></div>
    </section>
  );
}

const ROUND_IMAGE_LINKS = [
  {
    href: "https://github.com/dydfuf/raondev",
    src: "/github.png",
    alt: "github-logo",
    tooltip: "github",
  },
  {
    href: "https://www.linkedin.com/in/%EC%B5%9C%EC%9A%A9%EC%97%B4/",
    src: "/linkedin.png",
    alt: "linkedin-logo",
    tooltip: "Linkedin",
  },
  {
    href: "https://www.youtube.com/channel/UC_9Nh2Xrh6C9u2e_zlIdEYA",
    src: "/youtube.png",
    alt: "youtube-logo",
    tooltip: "Youtube",
  },
];
