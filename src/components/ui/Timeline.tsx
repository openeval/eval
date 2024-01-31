import type { ReactNode } from "react";

import { cn } from "~/lib/utils";

export type TimelinePropsItem = Omit<
  TimelineItemProps,
  "isActive" | "isActiveBullet" | "bulletSize" | "lineSize"
> & {
  bulletSize?: number;
};

export type TimelineProps = {
  items: TimelinePropsItem[];
  activeItem: number;
  bulletSize?: number;
  lineSize?: number;
};

/*
  No bullet or line is active when activeItem is -1
  First bullet is active only if activeItem is 0 or more
  First line is active only if activeItem is 1 or more
*/

export const Timeline = ({
  items,
  activeItem,
  bulletSize = 16,
  lineSize = 2,
}: TimelineProps) => {
  return (
    <ul
      style={{
        paddingLeft: bulletSize / 2,
      }}
    >
      {items.map((item, index) => {
        return (
          <TimelineItem
            key={index}
            title={item.title}
            bullet={item.bullet}
            isLast={index === items.length - 1}
            isActive={activeItem === -1 ? false : activeItem >= index + 1}
            isActiveBullet={activeItem === -1 ? false : activeItem >= index}
            bulletSize={bulletSize}
            lineSize={lineSize}
          >
            {item.children}
          </TimelineItem>
        );
      })}
    </ul>
  );
};

export type TimelineItemProps = {
  title: ReactNode;
  bullet?: ReactNode;
  children: ReactNode;
  isLast?: boolean;
  isActive: boolean;
  isActiveBullet: boolean;
  className?: string;
  bulletSize: number;
  lineSize: number;
};

export const TimelineItemBullet = ({
  children,
  isActive,
  bulletSize,
  lineSize,
}: {
  children?: ReactNode;
  isActive?: boolean;
  bulletSize: number;
  lineSize: number;
}) => {
  return (
    <div
      className={cn(
        "absolute top-0 flex items-center justify-center rounded-full border bg-background",
        isActive && "border-primary",
      )}
      style={{
        width: bulletSize,
        height: bulletSize,
        left: -bulletSize / 2 - lineSize / 2,
        borderWidth: lineSize,
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export const TimelineItemTitle = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-1 text-base font-semibold leading-none">{children}</div>
  );
};

export const TimelineItem = ({
  children,
  bullet,
  title,
  isLast,
  isActive,
  isActiveBullet,
  bulletSize,
  className,
  lineSize,
  ...props
}: TimelineItemProps) => {
  return (
    <li
      className={cn(
        "relative border-l pb-8 pl-8",
        isLast && "border-l-transparent pb-0",
        isActive && !isLast && "border-l-primary",
        className,
      )}
      style={{
        borderLeftWidth: lineSize,
      }}
      {...props}
    >
      <TimelineItemBullet
        lineSize={lineSize}
        bulletSize={bulletSize}
        isActive={isActiveBullet}
      >
        {bullet}
      </TimelineItemBullet>
      <TimelineItemTitle>{title}</TimelineItemTitle>
      {children}
    </li>
  );
};

export const TimelineItemDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

export const TimelineItemSmallText = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="pt-1 text-xs">{children}</div>;
};
