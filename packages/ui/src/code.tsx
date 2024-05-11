export function Code({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element {
  console.log("hello world! code!");
  return <code className={className}>{children}</code>;
}
