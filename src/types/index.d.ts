import type { Icon } from "lucide-react";

import type { Subjects } from "~/config/security";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  accessSubject: Subjects;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icon;
  children?: NavItem[];
  href?: string;
  accessSubject: typeof Subjects;
};

export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: { message: string; errorCode?: API_ERROR_CODE_KEY; extra?: unknow };
};
