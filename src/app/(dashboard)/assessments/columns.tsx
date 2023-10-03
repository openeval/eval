"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "~/components/ui/Badge";
import { formatDate } from "~/lib/utils";
import Link from "next/link";
import type { Assessment } from "@prisma/client";
import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Switch } from "~/components/ui/Switch";

export type Item = Assessment & {
  _count: { candidatesOnAssessments: number; submissions: number };
};

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`/assessments/${row.original.id as string}`}>
              {row.getValue("title")}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.candidates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Candidates" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <Link href={`/assessments/${row.original.id}/candidates`}>
            {row.original._count.candidatesOnAssessments}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.submissions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submissions" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-between">
          <Link href={`/assessments/${row.original.id}/submissions`}>
            {row.original._count.submissions}
          </Link>
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
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {/* TODO: handle action on change */}
          <Switch checked={row.getValue("published")}></Switch>
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
          {formatDate(row.getValue("createdAt").toDateString())}
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
