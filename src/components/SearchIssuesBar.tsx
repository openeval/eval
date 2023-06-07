"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "~/components/ui/Input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, type KeyboardEvent } from "react";

export default function SearchIssuesBar() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const q = searchParams?.get("q");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams || "");
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [searchQuery, setSearchQuery] = useState(q || "");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push(pathname + "?" + createQueryString("q", event.target.value));
    }
  };

  return (
    <div className="flex flex-row">
      {/* <Button className="border-lightgray bg-dark flex  items-center rounded-l-md border border-r-0 px-4 text-sm font-semibold text-zinc-200 hover:border-zinc-400">
        Filters <ChevronDown className="ml-1 mt-px h-4 w-4" />
      </Button> */}
      <label className="relative w-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center px-2">
          <Search className="h-4 w-4" />
        </span>
        <Input
          className="pl-9"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
}
