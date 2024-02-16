import { clsx, type ClassValue } from "clsx";
import { formatDistanceStrict } from "date-fns";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { type ZodRawShape } from "zod";

import { env } from "~/env.mjs";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function selectFromSchema<T extends ZodRawShape>(schema: {
  shape: T;
}): { [K in keyof T]: true } {
  const keys = Object.keys(schema.shape) as Array<keyof T>;
  const extractedObj = {} as { [K in keyof T]: true };
  keys.forEach((key) => {
    extractedObj[key] = true;
  });
  return extractedObj;
}

// November 27, 2023
export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
export function formatDateWithTime(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
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

export function constructMetadata({
  title = "Eval - The open skills assessment platform",
  description = "Eval is an open-source assessment platform to evaluate technical skills",
  image = "https://useeval.com/_static/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@IvanHoromanski",
    },
    icons,
    metadataBase: new URL(absoluteUrl()),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function truncateString(str: string, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

export function toStringUser(user, displayMode = "full") {
  switch (displayMode) {
    case "full":
      return `${user.name || user.email}`;

    case "short":
      return `${user.name ? user.name.charAt(0) : user.email.charAt(0)}`;
  }
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep<T>(target: T, ...sources: [T]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

/** Web compatible method to create a random string of a given length */
export function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}

/** Web compatible method to create a hash, using SHA256 */
export async function createHash(message: string) {
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toString();
}
