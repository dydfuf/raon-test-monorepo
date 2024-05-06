"use client";

import { useTheme } from "next-themes";
import { PropsWithChildren } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
interface Props {
  language: string;
}

export default function MarkDownSyntaxHighlighter({
  language,
  children,
}: PropsWithChildren<Props>) {
  const { theme } = useTheme();

  const style = theme === "light" ? oneLight : oneDark;

  return (
    <SyntaxHighlighter style={style} language={language} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
}
