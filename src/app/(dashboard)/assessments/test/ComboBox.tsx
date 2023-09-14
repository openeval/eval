"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/Button";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
import { Multiselect } from "~/components/ui/Multiselect";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/Popover";

import { Search } from "./Search";

const POPOVER_WIDTH = "w-[250px]";

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Product | undefined>();

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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between", POPOVER_WIDTH)}
          >
            {displayName}

            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent side="bottom" className={cn("p-0", POPOVER_WIDTH)}>
          <Search selectedResult={selected} onSelectResult={handleSetActive} />
        </PopoverContent>
      </Popover>
    </QueryClientProvider>
  );
}
