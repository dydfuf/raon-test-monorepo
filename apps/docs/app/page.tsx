import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@raonc/ui/components/avatar";
import { buttonVariants } from "@raonc/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@raonc/ui/components/card";
import { cn } from "@raonc/ui/lib/utils";
import { Icons } from "components/icons";
import {
  PageActions,
  PageGrid,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "components/page-header";
import { siteConfig } from "config/site";
import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Raon 모노레포의 UI 패키지 문서</PageHeaderHeading>
        <PageHeaderDescription>
          Shadcn/ui를 기반으로 작성되었으며, 프로젝트 목적에 맞게 커스터마이징
          되었습니다. 또한, Raon의 디자인 시스템에 맞게 구성되어 있습니다.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/docs/components" className={cn(buttonVariants())}>
            See Components
          </Link>
          <Link
            target="_blank"
            rel="noreferrer noopener"
            href={siteConfig.links.github}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Icons.github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </PageActions>
        <PageGrid>
          {PROJECTS.map((project) => (
            <Card key={project.name} className="flex flex-col">
              <CardHeader className="flex-row gap-4">
                <Avatar>
                  <AvatarImage src={project.avatarImage} />
                  <AvatarFallback>{project.avatarFallback}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
              <CardFooter className="space-x-4 mt-auto">
                <Link
                  href={project.siteLink}
                  className={cn(buttonVariants())}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit Site
                </Link>
                <Link
                  href={project.githubLink}
                  className={cn(buttonVariants({ variant: "outline" }))}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Icons.github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </CardFooter>
            </Card>
          ))}
        </PageGrid>
      </PageHeader>
    </div>
  );
}

const PROJECTS = [
  {
    avatarImage: "https://blog.raonc.dev/avatar.png",
    avatarFallback: "RN",
    name: siteConfig.projects.blog.name,
    description: siteConfig.projects.blog.description,
    siteLink: siteConfig.projects.blog.siteLink,
    githubLink: siteConfig.projects.blog.githubLink,
  },
  {
    avatarImage: "https://cookie-jelly.vercel.app/icons/icon-192x192.png",
    avatarFallback: "CJ",
    name: siteConfig.projects.cookieJelly.name,
    description: siteConfig.projects.cookieJelly.description,
    siteLink: siteConfig.projects.cookieJelly.siteLink,
    githubLink: siteConfig.projects.cookieJelly.githubLink,
  },
];
