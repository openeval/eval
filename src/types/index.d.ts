export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  children?: SidebarNavItem[];
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type ActionResponse<T> = {
  success: boolean;
  data?: T;
  error?: { message: string; extra?: unknow };
};
