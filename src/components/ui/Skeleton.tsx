import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "h-5 w-2/5",
      profile: "h-12 w-12 rounded-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div className={cn(skeletonVariants({ variant }), className)} {...props} />
  );
}

export { Skeleton };
