import { PostHog } from "posthog-node";

export function PostHogClient() {
  return new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
}
