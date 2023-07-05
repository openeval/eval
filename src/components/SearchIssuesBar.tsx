"use client";

import { Search } from "lucide-react";
import { Input } from "~/components/ui/Input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

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

  const [searchQuery, setSearchQuery] = useState<string>(q || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`${pathname}?${createQueryString("q", event.target.value)}`);
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
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
}
