"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

import { Callout } from "~/components/ui/Callout";
import { cn } from "~/lib/utils";
import { Typography } from "./ui/Typography";

interface ComponentTypes {
  className?: string;
  href?: string;
  // [key: string]: any;
}

function Markdown({ content }: { content: string }) {
  const components = {
    h1: (props: ComponentTypes) => <Typography variant={"h1"} {...props} />,
    h2: ({ className, ...props }: ComponentTypes) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: ComponentTypes) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: ComponentTypes) => (
      <h4
        className={cn(
          "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }: ComponentTypes) => (
      <h5
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }: ComponentTypes) => (
      <h6
        className={cn(
          "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }: ComponentTypes) => (
      <a
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }: ComponentTypes) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }: ComponentTypes) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: ComponentTypes) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: ComponentTypes) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }: ComponentTypes) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cn("rounded-md border", className)}
        alt={alt}
        {...props}
      />
    ),
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className={cn("w-full", className)} {...props} />
      </div>
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        className={cn("m-0 border-t p-0 even:bg-muted", className)}
        {...props}
      />
    ),
    th: ({ className, ...props }: ComponentTypes) => (
      <th
        className={cn(
          "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: ComponentTypes) => (
      <td
        className={cn(
          "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }: ComponentTypes) => (
      <pre
        className={cn(
          "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }: ComponentTypes) => (
      <code
        className={cn(
          "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      />
    ),
    Callout,
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji]}
      rehypePlugins={[rehypeRaw, rehypeSlug, rehypeAutolinkHeadings]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

export default Markdown;
