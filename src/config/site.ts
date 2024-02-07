export const siteConfig = {
  name: "Eval",
  contactUsEmail: "hi@useeval.com",
  github: {
    searchQueryString: "is:public is:open",
  },
  pageListLimit: 10,
  sidebarNav: [
    {
      title: "Assessments",
      href: "/assessments",
      icon: "FileBadge",
    },
    {
      title: "Submissions",
      href: "/submissions",
      icon: "ListTodo",
    },
    {
      title: "Candidates",
      href: "/candidates",
      icon: "Users",
    },
    {
      title: "Settings",
      // href: "/settings",
      icon: "Settings",
      children: [
        { title: "General", href: "/settings/general" },
        { title: "Team", href: "/settings/team" },
        { title: "Billing", href: "/billing/settings" },
      ],
    },
  ],
  termsUrl: "https://useeval.com/terms",
  privacyUrl: "https://useeval.com/privacy",
};
