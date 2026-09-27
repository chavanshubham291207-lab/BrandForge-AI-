export function cn(...classes: any[]): string {
  return classes
    .flat()
    .filter(Boolean)
    .map((c) => (typeof c === "function" ? c() : c))
    .join(" ");
}
