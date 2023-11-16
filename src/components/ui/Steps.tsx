import { Slot } from "@radix-ui/react-slot";
// import { ChevronsRight } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

type StepsProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  className?: string;
};

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <ol
      className={cn(
        "flex flex-col divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500  sm:flex-row ",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

interface StepsItemProps {
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

Steps.Item = React.forwardRef<HTMLLIElement, StepsItemProps>(function Item(
  { className, isActive, children, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "li";
  return (
    <>
      <Comp
        ref={ref}
        className={cn(
          "flex flex-auto items-center justify-center gap-2 p-4",
          { "relative bg-gray-50 ": isActive },
          // content style arrows
          // "before:absolute before:-left-2 before:top-1/2 before:hidden before:h-4 before:w-4 before:-translate-y-1/2 before:rotate-45 before:border before:border-s-0 before:border-gray-100 first:before:hidden ltr:before:border-b-0 ltr:before:bg-white rtl:before:border-e-0 rtl:before:border-t-0 rtl:before:bg-gray-50 sm:before:block",
          // "after:absolute after:-right-2 after:top-1/2 after:hidden after:h-4 after:w-4 after:-translate-y-1/2 after:rotate-45 after:border after:border-gray-100 last:after:hidden ltr:after:border-b-0 ltr:after:border-s-0 ltr:after:bg-gray-50 rtl:after:border-e-0 rtl:after:border-t-0 rtl:after:bg-white sm:after:block",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </>
  );
});

type StepsContentProps = React.HTMLAttributes<HTMLDivElement>;

Steps.Content = function StepsContent({
  className,
  ...props
}: StepsContentProps) {
  return <p className={cn("leading-none", className)} {...props} />;
};

type StepsTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

Steps.Title = function StepsTitle({ className, ...props }: StepsTitleProps) {
  return <strong className={cn("block font-medium", className)} {...props} />;
};

type StepsDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

Steps.Description = function StepsDescription({
  className,
  ...props
}: StepsDescriptionProps) {
  return <small className={cn("mt-1", className)} {...props} />;
};

interface StepsIconProps {
  icon: React.FC<{ className?: string }>;
  className?: string;
}

Steps.Icon = function StepsIcon({
  className,
  icon: Icon,
  ...props
}: StepsIconProps) {
  return <Icon className={cn("h-7 w-7 shrink-0", className)} {...props} />;
};
