import { Badge, BadgeProps } from "@raonc/ui/components/badge";
import { cn } from "@raonc/ui/lib/utils";

interface Props extends BadgeProps {}

export default function NoteBadge({ className, ...rest }: Props) {
  return <Badge variant={"default"} className={cn("text-[14px]")} {...rest} />;
}
