import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "~/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight ",
      h2: "mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700",
      h3: "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote:
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200",
      lead: "text-xl text-slate-700 dark:text-slate-400",
      subtle: "text-sm text-slate-500 dark:text-slate-400",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      small: "text-sm font-medium leading-none",
    },
    size: {
      default: "",
      sm: "text-sm font-normal",
      lg: "text-3xl font-normal",
    },
  },
  defaultVariants: {
    variant: "p",
    size: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, as, size, variant, children, ...props }, ref) => {
    const classes = cn(typographyVariants({ variant, size, className }));

    // @ts-expect-error we avoid a switch case by variant
    const element = React.isValidElement(React.createElement(variant))
      ? variant
      : "p";

    const template = React.createElement(
      // @ts-expect-error no error here
      as || element,
      {
        ...props,
        ref,
        className: classes,
      },
      children
    );

    return template;
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
