import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Blockquote, Code, Em, Heading, Link, Text } from "@radix-ui/themes";
import MarkDownSyntaxHighlighter from "./MarkDownSyntaxHighlighter.client";

interface Props {
  markdownStr: string;
}

export default function MarkdownRenderer({ markdownStr }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1({ children }) {
          return (
            <Heading as="h1" size={"9"} className="!my-28">
              {children}
            </Heading>
          );
        },
        h2({ children }) {
          return (
            <Heading as="h2" size={"8"} className="!my-24">
              {children}
            </Heading>
          );
        },
        h3({ children }) {
          return (
            <Heading as="h3" size={"7"} className="!my-20">
              {children}
            </Heading>
          );
        },
        h4({ children }) {
          return (
            <Heading as="h4" size={"6"} className="!my-16">
              {children}
            </Heading>
          );
        },
        h5({ children }) {
          return (
            <Heading as="h5" size={"5"} className="!my-12">
              {children}
            </Heading>
          );
        },
        h6({ children }) {
          return (
            <Heading as="h6" size={"4"} className="!my-8">
              {children}
            </Heading>
          );
        },
        span({ children }) {
          return <Text as="span">{children}</Text>;
        },
        p({ children }) {
          return (
            <Text as="p" className="!my-16 leading-[1.75]" size={"5"}>
              {children}
            </Text>
          );
        },
        em({ children }) {
          return (
            <Em className="!text-12 block p-4 w-full text-center">
              {children}
            </Em>
          );
        },
        blockquote({ children }) {
          return <Blockquote>{children}</Blockquote>;
        },
        a({ children }) {
          return <Link>{children}</Link>;
        },
        ul({ children }) {
          return (
            <Text size={"4"} asChild>
              <ul className="list-disc list-inside leading-[1.5]">
                {children}
              </ul>
            </Text>
          );
        },
        ol({ children }) {
          return (
            <Text size={"4"} asChild>
              <ol className="list-decimal list-inside leading-[1.5]">
                {children}
              </ol>
            </Text>
          );
        },
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return <Code>{children}</Code>;
          }

          if (match) {
            return (
              <MarkDownSyntaxHighlighter language={match[1] as string}>
                {children}
              </MarkDownSyntaxHighlighter>
            );
          }

          return <Code>{children}</Code>;
        },
      }}
    >
      {markdownStr}
    </ReactMarkdown>
  );
}
