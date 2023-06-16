import * as React from "react";

import { cn } from "~/lib/utils";

type StepsProps = React.HTMLAttributes<HTMLOlElement> & {
  children?: React.ReactNode;
  className?: string;
};

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <ol
      className={cn(
        "flex flex-col divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:flex-row ",
        className
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
}

Steps.Item = function StepsItem({
  className,
  isActive,
  children,
  ...props
}: StepsItemProps) {
  return (
    <li
      className={cn(
        "flex flex-auto items-center justify-center gap-2 p-4",
        { "relative bg-gray-50 ": isActive },
        className
      )}
      {...props}
    >
      {isActive && (
        <>
          <span className="border-s-0 rtl:border-e-0 absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 first:hidden ltr:border-b-0 ltr:bg-white rtl:border-t-0 rtl:bg-gray-50 sm:block"></span>
          <span className="ltr:border-s-0 rtl:border-e-0 absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:bg-gray-50 rtl:border-t-0 rtl:bg-white sm:block"></span>
        </>
      )}
      {children}
    </li>
  );
};

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
  icon: React.FC<{ className: string }>;
  className?: string;
}

Steps.Icon = function StepsIcon({
  className,
  icon: Icon,
  ...props
}: StepsIconProps) {
  return <Icon className={cn("h-7 w-7 shrink-0", className)} {...props} />;
};
