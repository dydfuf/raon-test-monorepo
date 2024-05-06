import { cn } from "@raonc/ui/lib/utils";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  className?: string;
}

export default function Preview({
  title,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className="w-full p-10 border-1 flex flex-col gap-10 border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className={cn("flex flex-col gap-5", className)}>{children}</div>
    </div>
  );
}
