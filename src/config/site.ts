import type { SidebarNavItem } from "~/types";

type SiteConfig = {
  name: string;
  contactUsEmail: string;
  github: {
    searchQueryString: string;
  };
  pageListLimit: number;
  sidebarNav: SidebarNavItem[];
  termsUrl: string;
  privacyUrl: string;
};

export const siteConfig: SiteConfig = {
  name: "Eval",
  contactUsEmail: "hi@useeval.com",
  github: {
    searchQueryString: "is:public is:open",
  },
  pageListLimit: 10,
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard",
      icon: "Home",
      accessSubject: "Dashboard",
    },
    {
      title: "Assessments",
      href: "/assessments",
      icon: "FileBadge",
      accessSubject: "Assessment",
    },
    {
      title: "Submissions",
      href: "/submissions",
      icon: "ListTodo",
      accessSubject: "Submission",
    },
    {
      title: "Candidates",
      href: "/candidates",
      icon: "Users",
      accessSubject: "Candidate",
    },
    {
      title: "Settings",
      // href: "/settings",
      icon: "Settings",
      children: [
        {
          title: "General",
          href: "/settings/general",
          accessSubject: "Settings",
        },
        { title: "Team", href: "/settings/team", accessSubject: "Member" },
        {
          title: "Billing",
          href: "/billing/settings",
          accessSubject: "Billing",
        },
      ],
      accessSubject: "Settings",
    },
  ],
  termsUrl: "https://useeval.com/terms",
  privacyUrl: "https://useeval.com/privacy",
};
