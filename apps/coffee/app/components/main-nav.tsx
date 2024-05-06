import { NavLink } from "@remix-run/react";
import { Icons } from "./Icons";
import { siteConfig } from "../constant/common";
import { cn } from "@raonc/ui/lib/utils";

export default function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <NavLink to="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </NavLink>
      <nav className="flex items-center gap-6 text-sm">
        {siteConfig.mainNav.map((navItem) => (
          <NavLink
            key={navItem.to}
            to={navItem.to}
            className={({ isActive }) =>
              cn(
                "transition-colors hover:text-foreground/80",
                isActive ? "text-foreground" : "text-foreground/60"
              )
            }
          >
            {navItem.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
