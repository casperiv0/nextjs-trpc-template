export function classnames(...classes: unknown[]) {
  return classes.filter(Boolean).join(" ");
}
