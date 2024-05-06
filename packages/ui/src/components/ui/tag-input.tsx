import * as React from "react";
import { cn } from "@ui/lib/utils";
import {
  type Tag,
  TagInput as TagInputPrimitive,
  type TagInputProps,
} from "emblor";

const TagInput = React.forwardRef<
  React.ElementRef<typeof TagInputPrimitive>,
  React.ComponentPropsWithoutRef<typeof TagInputPrimitive> & TagInputProps
>(({ className, ...props }, ref) => (
  <TagInputPrimitive ref={ref} className={cn(className)} {...props} />
));
TagInput.displayName = "TagInput";

export { type Tag, TagInput, type TagInputProps };
