"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { Badge } from "~/components/ui/Badge";
import { DataTableColumnHeader } from "~/components/ui/data-table-column-header";
import { ProgressCircle } from "~/components/ui/ProgressCircle";
import { formatDate } from "~/lib/utils";
import type { SubmissionsListData } from "~/server/services/Submissions";
import { DataTableRowActions } from "./data-table-row-actions";

export type Item = SubmissionsListData["data"][0];

export const columns: ColumnDef<Item>[] = [
  {
    // accessorKey doesn't work with relationships...
    // https://github.com/TanStack/table/issues/579#issuecomment-841844029
    // accessorKey: "assessment.title",
    id: "assessment.title",
    accessorFn: (row) => {
      return row.assessment.title;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Assessment" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`submissions/${row.original.id}`}>
              {row.original.assessment.title}
            </Link>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contribution.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contribution" />
    ),

    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link href={`submissions/${row.original.id}`}>
              {row.original.contribution?.title}
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
    accessorKey: "reviews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reviews" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">{row.original.reviews.length}</div>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex  items-center">
          <ProgressCircle
            value={row.getValue("score")}
            size="small"
            showValue={true}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submitted" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          {formatDate((row.getValue("createdAt") as Date).toDateString())}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
