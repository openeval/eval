"use client";

import { Dot, FileBadge, ListTodo, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "~/lib/utils";
import { type SidebarNavItem } from "~/types";

interface DashboardNavProps {
  items: SidebarNavItem[];
  onClickMenuItem?: () => void;
}

const Icons = { Settings, Users, FileBadge, Dot, ListTodo };

export function SideNav({ items, onClickMenuItem }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn("grid gap-1")}>
      {items.map((item, index) => {
        return (
          <NavItem
            key={index}
            item={item}
            isActive={path === item.href}
            onClick={() => {
              if (onClickMenuItem && typeof onClickMenuItem === "function") {
                onClickMenuItem();
              }
            }}
          />
        );
      })}
    </nav>
  );
}

type NavItemProps = {
  item: SidebarNavItem;
  isActive?: boolean;
  isChild?: boolean;
  onClick?: () => void;
};
function NavItem({ item, isActive, isChild, onClick }: NavItemProps) {
  const Icon = Icons[item.icon || "Dot"];
  const path = usePathname();

  return (
    <>
      <Link
        aria-label={item.title}
        href={item.disabled || !item.href ? "#" : item.href}
        onClick={() => {
          if (onClick && typeof onClick === "function") {
            onClick();
          }
        }}
      >
        <div
          className={cn(
            "group -ml-3 flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100",
            isActive ? "bg-slate-200" : "transparent",
            item.disabled && "cursor-not-allowed opacity-80",
            isChild && "pl-10",
          )}
        >
          {item.icon && <Icon className="h-4 w-4" />}

          <span className="ml-2">{item.title}</span>
        </div>
      </Link>
      {item.children &&
        item.children.map((child, key) => (
          <NavItem
            key={key}
            item={child}
            isActive={path === child.href}
            onClick={onClick}
            isChild
          />
        ))}
    </>
  );
}
