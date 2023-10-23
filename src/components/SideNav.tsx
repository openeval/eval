"use client";

import { ArrowRight, FileBadge, ListTodo, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { type SidebarNavItem } from "~/types";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const Icons = { Settings, Users, FileBadge, ArrowRight, ListTodo };

export function SideNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "ArrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100",
                  path === item.href ? "bg-slate-200" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
