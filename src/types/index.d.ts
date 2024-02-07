import type { Icon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icon;
  children?: NavItem[];
  href?: string;
};

export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: { message: string; errorCode?: API_ERROR_CODE_KEY; extra?: unknow };
};
