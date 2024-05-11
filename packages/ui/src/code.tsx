export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  console.log("hello world! code!");
  console.log("UI: 1");
  console.log("UI: test");
  return <code className={className}>{children}</code>;
}
