"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "~/components/ui/Badge";
import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";
import { Switch } from "~/components/ui/Switch";
import { formatDate } from "~/lib/utils";
import { type AssessmentsListData } from "~/server/repositories/Assessments";
import { DataTableRowActions } from "./data-table-row-actions";

export type Item = AssessmentsListData[0];

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
