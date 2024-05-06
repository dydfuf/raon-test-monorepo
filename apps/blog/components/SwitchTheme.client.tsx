"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const switchTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    if (theme === "dark") {
      setTheme("light");
      return;
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <IconButton
          ml={"auto"}
          variant="ghost"
          onClick={switchTheme}
          size={"3"}
        >
          {theme === "light" && <SunIcon />}
          {theme === "dark" && <MoonIcon />}
        </IconButton>
      )}
    </>
  );
}
