"use client";

import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { DataTable } from "~/components/ui/DataTable";
import { useDataTable } from "~/hooks/useDataTable";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  dataCount: number;
}

export function SubmissionsDataTable<TData, TValue>({
  columns,
  data,
  dataCount,
}: DataTableProps<TData, TValue>) {
  const { table } = useDataTable({
    columns,
    data,
    dataCount,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <DataTable table={table} />
    </div>
  );
}
