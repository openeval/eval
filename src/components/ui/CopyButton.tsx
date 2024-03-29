"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { cn } from "~/lib/utils";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}

async function copyToClipboardWithMeta(value: string) {
  await navigator.clipboard.writeText(value);
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <button
      className={cn(
        "relative z-20 inline-flex h-8 items-center justify-center rounded-md border-slate-200 p-2 text-sm font-medium text-slate-900 transition-all hover:bg-slate-100 focus:outline-none dark:text-slate-100 dark:hover:bg-slate-800",
        className,
      )}
      onClick={async () => {
        await copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
