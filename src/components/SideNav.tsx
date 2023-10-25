"use client";

import { Dot, FileBadge, ListTodo, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { type SidebarNavItem } from "~/types";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const Icons = { Settings, Users, FileBadge, Dot, ListTodo };

export function SideNav({ items }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        return (
          <NavItem key={index} item={item} isActive={path === item.href} />
        );
      })}
    </nav>
  );
}

type NavItemProps = {
  item: SidebarNavItem;
  isActive?: boolean;
  isChild?: boolean;
};
function NavItem({ item, isActive, isChild }: NavItemProps) {
  const Icon = Icons[item.icon || "Dot"];
  const path = usePathname();

  return (
    <nav className={cn("grid items-start gap-1")}>
      <Link
        aria-label={item.title}
        href={item.disabled || !item.href ? "#" : item.href}
      >
        <div
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100",
            isActive ? "bg-slate-200" : "transparent",
            item.disabled && "cursor-not-allowed opacity-80",
            isChild && "ml-8",
          )}
        >
          {item.icon && <Icon className="h-4 w-4" />}

          <span className="ml-4">{item.title}</span>
        </div>
      </Link>
      {item.children &&
        item.children.map((child, key) => (
          <NavItem
            key={key}
            item={child}
            isActive={path === child.href}
            isChild
          />
        ))}
    </nav>
  );
}
