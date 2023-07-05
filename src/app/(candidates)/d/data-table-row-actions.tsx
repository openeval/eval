"use client";

import type { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pen } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/DropdownMenu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData & { original: TData }>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          <Link
            href={`/assessments/${row.original.id as string}`}
            className="flex w-full"
          >
            Edit
          </Link>
        </DropdownMenuItem>
        {/* TODO: implement delete  */}
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
