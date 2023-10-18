import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils";

const boxVariants = cva(
  "flex  shrink-0 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700",
  {
    variants: {
      variant: {
        dashed: "border-dashed",
        shadow: "shadow-sm",
      },
      size: {
        default: "h-[150px]",
        sm: "h-[250px]",
        lg: "h-[450px]",
      },
    },
    defaultVariants: {
      variant: "dashed",
      size: "default",
    },
  },
);
export interface BoxProps
  extends React.HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {}

const Box: React.FC<BoxProps> = ({ className, variant, size, ...props }) => (
  <div className={cn(boxVariants({ variant, size, className }))} {...props} />
);

Box.displayName = "Box";

export { Box };
