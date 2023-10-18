import { clsx, type ClassValue } from "clsx";
import { formatDistanceStrict } from "date-fns";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import { env } from "~/env.mjs";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

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
