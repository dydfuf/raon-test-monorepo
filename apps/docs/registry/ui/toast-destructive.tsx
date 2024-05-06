"use client";

import { Button } from "@raonc/ui/components/button";
import { ToastAction } from "@raonc/ui/components/toast";
import { useToast } from "@raonc/ui/components/use-toast";

export default function ToastDestructive() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
}
