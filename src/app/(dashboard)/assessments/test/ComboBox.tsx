"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/Command";

const queryClient = new QueryClient();
import { Multiselect } from "~/components/ui/Multiselect";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";
import * as Tooltip from "@radix-ui/react-tooltip";

import { Search } from "./Search";
import { Input } from "~/components/ui/Input";

const POPOVER_WIDTH = "w-[250px]";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Product | undefined>();
  const inputRef = React.createRef();

  const handleSetActive = React.useCallback((product: Product) => {
    setSelected(product);

    // OPTIONAL: close the combobox upon selection
    // setOpen(false);
  }, []);

  const displayName = selected ? selected.name : "Select product";
  const FRAMEWORKS = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
    {
      value: "wordpress",
      label: "WordPress",
    },
    {
      value: "express.js",
      label: "Express.js",
    },
    {
      value: "nest.js",
      label: "Nest.js",
    },
  ] satisfies Framework[];

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello</h1>
      <Multiselect />
      <Tooltip.Provider>
        <Tooltip.Root open={open}>
          <Tooltip.Trigger
            asChild
            onFocus={() => {
              setOpen(true);
            }}
            onBlur={() => {
              setOpen(false);
            }}
          >
            <Input type="text"></Input>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              align="center"
              className={
                "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              }
            >
              <Tooltip.Arrow />
              <div>Hello popover</div>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <Command
        open={open}
        onOpenChange={setOpen}
        shouldFilter={false}
        className="h-auto rounded-lg border border-b-0 shadow-md"
      >
        <CommandInput placeholder="Search for repo" />
        <CommandList>
          <CommandItem>Hello List</CommandItem>
        </CommandList>
      </Command>

      {/* <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Input onFocus={() => setOpen(true)} type="text"></Input>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          onOpenAutoFocus={(event) => {
            console.log("called");

            return event.preventDefault;
          }}
          onCloseAutoFocus={(event) => {
            console.log("test");

            event.preventDefault;
          }}
          className={cn("p-0", POPOVER_WIDTH)}
        >
          <div>Hello popover</div>
        </PopoverContent>
      </Popover> */}
    </QueryClientProvider>
  );
}
