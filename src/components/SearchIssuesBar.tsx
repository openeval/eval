"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import * as React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/Command";
import { Input } from "~/components/ui/Input";
import { popularLanguages, popularTags } from "~/config/ghSearch";
import { Badge } from "./ui/Badge";

export default function SearchIssuesBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const searchParams = useSearchParams();

  const q = searchParams?.get("q");

  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams || "");
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [searchQuery, setSearchQuery] = useState<string>(q || "");

  const onOpenChange = () => {
    if (open) {
      // reset query on exit
      setSearchQuery(q || "");
    }
    setOpen((open) => !open);
  };
  const handleChange = (value) => {
    setSearchQuery(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // avoid adding the selected Badge from the list of items by default
      event.preventDefault();
      event.stopPropagation();

      router.push(`${pathname}?${createQueryString("q", event.target.value)}`);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-row">
      <label className="relative w-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
          <Search className="h-4 w-4" />
        </span>
        <Input
          className="pl-9"
          type="text"
          value={searchQuery}
          onClick={() => setOpen(true)}
          readOnly
        />
      </label>

      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <Command shouldFilter={false}>
          <CommandInput
            autoFocus
            value={searchQuery}
            onValueChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
          />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandItem value="" className="hidden" />

            <CommandGroup heading="Top labels">
              <div className="flex flex-row flex-wrap">
                {popularTags.map((tag, key) => (
                  <CommandItem
                    value={tag}
                    onFocus={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="flex-initial cursor-pointer py-0"
                    onSelect={(value) => {
                      setSearchQuery(
                        (searchQuery) => searchQuery + " label:" + value,
                      );
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    key={key}
                  >
                    <Badge className="px-2">{tag}</Badge>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
            <CommandSeparator />

            <CommandGroup heading="Top languages">
              <div className="flex flex-row flex-wrap">
                {popularLanguages.map((lang, key) => (
                  <CommandItem
                    value={lang}
                    className="flex-initial cursor-pointer py-0"
                    onSelect={(value) => {
                      setSearchQuery(
                        (searchQuery) => searchQuery + " language:" + value,
                      );
                    }}
                    key={key}
                  >
                    <Badge className="px-2">{lang}</Badge>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="bottom-0 left-0  w-full flex-row border-t  p-4 ">
          <div className="flex gap-x-16 ">
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">label:bug</span>{" "}
                <span className="text-xs text-foreground">
                  Search within a label
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">&quot;help me&quot;</span>{" "}
                <span className="text-xs text-foreground">Exact phrase</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">language:Go</span>{" "}
                <span className="text-xs text-foreground">
                  Programming languages
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">repo:openEval/eval</span>{" "}
                <span className="text-xs text-foreground">
                  Search within a repositories
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">org:openEval</span>{" "}
                <span className="text-xs text-foreground">
                  Search within an organization
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">user:openEval</span>{" "}
                <span className="text-xs text-foreground">
                  Search within personal account
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-row justify-between">
            <div className=" text-sm">
              {/* TODO: create an internal page */}
              <a
                className="text-xs hover:underline"
                href="https://docs.github.com/en/search-github/github-code-search/understanding-github-code-search-syntax"
              >
                Search syntax tips
              </a>
            </div>
            <div>
              <span className=" text-sm">
                press (<kbd>↵</kbd>)
              </span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </div>
  );
}
