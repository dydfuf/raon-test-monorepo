import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { badgeVariants } from "@raonc/ui/components/badge";
import { ScrollArea } from "@raonc/ui/components/scroll-area";
import { cn } from "@raonc/ui/lib/utils";
import { Mdx } from "components/mdx-components";
import { DocsPager } from "components/pager";
import { DashboardTableOfContents } from "components/toc";
import { siteConfig } from "config/site";
import { allProjects } from "contentlayer/generated";
import { getTableOfContents } from "lib/toc";
import { absoluteUrl } from "lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

interface ProjectsDetailPageProps {
  params: {
    projectName: string;
  };
}

async function getProjectFromParams({ params }: ProjectsDetailPageProps) {
  const { projectName } = params;
  const project = allProjects.find((p) => p.slugAsParams === projectName);

  if (!project) {
    return null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectsDetailPageProps): Promise<Metadata> {
  const project = await getProjectFromParams({ params });

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: absoluteUrl(project.slug),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [siteConfig.ogImage],
      creator: "@raonc",
    },
  };
}

export async function generateStaticParams(): Promise<
  ProjectsDetailPageProps["params"][]
> {
  return allProjects.map((project) => ({
    projectName: project.slugAsParams,
  }));
}

export default async function ProjectsDetailPage({
  params,
}: ProjectsDetailPageProps) {
  const project = await getProjectFromParams({ params });

  if (!project) {
    return null;
  }

  const toc = await getTableOfContents(project.body.raw);

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Projects
          </div>
          <ChevronRightIcon className="h-4 w-4" />
          <div className="font-medium text-foreground">{project.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {project.title}
          </h1>
          {project.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{project.description}</Balancer>
            </p>
          )}
        </div>
        {project.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {project.links?.site && (
              <Link
                href={project.links?.site}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Site
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
            {project.links?.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
              >
                Github
                <ExternalLinkIcon className="h-3 w-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={project.body.code} />
        </div>
        <DocsPager content={project} />
      </div>
      {project.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </main>
  );
}
