"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/Badge";
import { formatDate } from "~/lib/utils";
import Link from "next/link";

import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { type CandidatesListData } from "~/server/repositories/Candidates";

export type Item = CandidatesListData[0];

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    accessorFn: (row) => row.name + row.lastName,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`/candidates/${row.original.id as string}`}>
              {row.original.name} {row.original.lastName}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <Badge variant="outline">{row.getValue("status")}</Badge>
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {formatDate((row.getValue("createdAt") as Date).toDateString())}
        </div>
      );
    },
    filterFn: (row, id, value: string) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
