export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  console.log("hello world! code!");
  console.log("UI: 1");
  return <code className={className}>{children}</code>;
}
