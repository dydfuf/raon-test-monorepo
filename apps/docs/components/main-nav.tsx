"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@raonc/ui/lib/utils";
import { siteConfig } from "../config/site";
import { Icons } from "./icons";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Components
        </Link>
        <Link
          href="/docs/projects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/projects")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Projects
        </Link>
        <Link
          href={siteConfig.links.blog}
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </Link>
        <Link
          href={siteConfig.links.cookieJelly}
          className="transition-colors hover:text-foreground/80 text-foreground/60"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cookie-Jelly
        </Link>
        <Link
          href={siteConfig.links.github}
          className="hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </nav>
    </div>
  );
}
