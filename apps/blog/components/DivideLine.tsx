import { cn } from "@raonc/ui/lib/utils";

interface Props {
  className?: string;
}

export default function DivideLine({ className }: Props) {
  return <div className={cn("w-full h-2 bg-[#e5e7eb]", className)} />;
}
