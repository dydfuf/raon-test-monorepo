import { UnderlineIcon } from "@radix-ui/react-icons";

import { Toggle } from "@raonc/ui/components/toggle";

export default function ToggleDisabled() {
  return (
    <Toggle aria-label="Toggle italic" disabled>
      <UnderlineIcon className="h-4 w-4" />
    </Toggle>
  );
}
