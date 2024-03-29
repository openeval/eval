"use client";

import { AssessmentStatus } from "@prisma/client";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { DataTableFacetedFilter } from "~/components/ui/DataTableFacetedFilter";
import { Input } from "~/components/ui/Input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("title") && (
          <Input
            placeholder="Filter..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-10 w-[150px] lg:w-[250px]"
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Object.values(AssessmentStatus).map((item) => {
              return { label: item, value: item };
            })}
          />
        )}
        {table.getColumn("published") && (
          <DataTableFacetedFilter
            column={table.getColumn("published")}
            title="Published"
            options={[
              { label: "yes", value: "true" },
              { label: "no", value: "false" },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
