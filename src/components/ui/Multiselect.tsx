"use client";

import * as React from "react";
import { X, CircleIcon, StarIcon, CircleDotIcon } from "lucide-react";
import { searchRepos } from "~/server/github";
import { Badge } from "~/components/ui/Badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "~/components/ui/Command";
import { Command as CommandPrimitive } from "cmdk";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "./Typography";

import { kIntFormat } from "~/lib/utils";

type Framework = Record<"value" | "name", string>;

interface Repo {
  id: string;
  name: string;
  full_name: string;
}

interface SearchResponse {
  repos: Repo[];
}
interface SearchProps {
  selectedResult?: Repo;
  onSelectResult: (repo: Repo) => void;
}

export function Multiselect() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelectResult = (repo: Repo) => {
    // onSelectResult(repo);
    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  const handleUnselect = React.useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const [debouncedSearchQuery] = useDebounce(inputValue, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchRepos(debouncedSearchQuery),
    enabled,
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  return (
    <div>
      <Command
        shouldFilter={false}
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((framework) => {
              return (
                <Badge
                  key={framework.value}
                  className="py-2"
                  variant="secondary"
                >
                  {framework.full_name}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(framework);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(framework)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              // onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select Repositories..."
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && enabled ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {/* TODO: these should have proper loading aria */}
                {isLoading && <div className="p-4 text-sm">Searching...</div>}
                {!isError && !isLoading && !data?.data?.items.length && (
                  <div className="p-4 text-sm">No repos found</div>
                )}
                {isError && (
                  <div className="p-4 text-sm">Something went wrong</div>
                )}

                {data?.data?.items.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                      }}
                      className={"cursor-pointer"}
                    >
                      <div>
                        <div className="grid grid-cols-[1fr_110px] items-start gap-2 space-y-0">
                          <div className="space-y-1">
                            <Typography variant={"h4"}>
                              {framework.full_name}
                            </Typography>
                            <Typography variant={"subtle"}>
                              {framework.description}
                            </Typography>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="flex space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                              {framework.language}
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="mr-1 h-3 w-3" />
                              {kIntFormat(framework.stargazers_count)}
                            </div>
                            <div className="flex items-center">
                              <CircleDotIcon className="mr-1 h-3 w-3" />
                              {framework.open_issues}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  );
}
