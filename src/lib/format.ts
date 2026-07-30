export function formatCount(n: number, format: "plain" | "comma"): string {
  return format === "comma" ? Math.round(n).toLocaleString("en-US") : String(Math.round(n));
}
