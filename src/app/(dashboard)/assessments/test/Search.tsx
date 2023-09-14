import * as React from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/Command";
// import type { Repo, SearchResponse } from '@/types';
import { searchRepos } from "~/server/github";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface Repo {
  id: string;
  name: string;
}

interface SearchResponse {
  repos: Repo[];
}
interface SearchProps {
  selectedResult?: Repo;
  onSelectResult: (repo: Repo) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (repo: Repo) => {
    onSelectResult(repo);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search for repo"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
}

function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchResponse>({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => searchRepos(debouncedSearchQuery),
    enabled,
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  if (!enabled) return null;
  console.log(data);
  return (
    <CommandList>
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !data?.data?.items.length && (
        <div className="p-4 text-sm">No repos found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {data?.data?.items.map(({ id, name }) => {
        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, name })}
            value={name}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedResult?.id === id ? "opacity-100" : "opacity-0",
              )}
            />
            {name}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}
