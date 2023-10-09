import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env.mjs";
import { formatDistanceStrict } from "date-fns";
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(date: Date) {
  return formatDistanceStrict(new Date(date), new Date(), { addSuffix: true });
}

export function absoluteUrl(path?: string | null) {
  return new URL(`${env.NEXT_PUBLIC_APP_URL}${path || ""}`);
}

/**
 * @internal
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  // check that value is object
  return !!value && !Array.isArray(value) && typeof value === "object";
}

export function kIntFormat(int) {
  return Intl.NumberFormat("en", {
    notation: "compact",
  }).format(int);
}
