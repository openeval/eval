import { http, HttpResponse } from "msw";

// mocks aren't working with nextjs 13
// https://github.com/vercel/next.js/discussions/56446
// https://github.com/valendres/playwright-msw/issues/76

export const handlers = [
  http.get("https://api.github.com/search/issues", () => {
    return HttpResponse.json({
      total_count: 9,
      incomplete_results: false,
      items: [
        {
          url: "https://api.github.com/repos/openeval/eval/issues/53",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/53/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/53/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/53/events",
          html_url: "https://github.com/openeval/eval/issues/53",
          id: 1996381549,
          node_id: "I_kwDOJBhfYc52_l1t",
          number: 53,
          title: "Implement e2e test to ensure stability",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-11-16T08:58:51Z",
          updated_at: "2023-11-16T08:58:51Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: null,
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/53/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/45",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/45/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/45/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/45/events",
          html_url: "https://github.com/openeval/eval/issues/45",
          id: 1978602734,
          node_id: "I_kwDOJBhfYc517xTu",
          number: 45,
          title: "Create a global alert component",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-11-06T08:48:25Z",
          updated_at: "2023-11-06T08:48:25Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: "like useToast , create a new hook to use an alert when users need to confirm an action",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/45/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/35",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/35/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/35/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/35/events",
          html_url: "https://github.com/openeval/eval/issues/35",
          id: 1946908358,
          node_id: "I_kwDOJBhfYc50C3bG",
          number: 35,
          title: "[ feature ] Redirect candidates to their active session ",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-10-17T08:56:37Z",
          updated_at: "2023-10-17T08:56:37Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: "When users click on their assessments redirect them to their active sessions ",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/35/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/33",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/33/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/33/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/33/events",
          html_url: "https://github.com/openeval/eval/issues/33",
          id: 1946698590,
          node_id: "I_kwDOJBhfYc50CENe",
          number: 33,
          title: "[feature] new markdown editor",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-10-17T07:05:43Z",
          updated_at: "2023-10-17T07:05:43Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body:
            "\r\n" +
            "We need to improve our text area input with markdown support. Ideally we have a preview tab as github to display formatted  markdown  \r\n" +
            "\r\n" +
            "## alternatives \r\n" +
            "- https://platejs.org/\r\n" +
            "- https://tiptap.dev/\r\n" +
            "\r\n" +
            "\r\n" +
            "\r\n" +
            '<img width="980" alt="image" src="https://github.com/openeval/eval/assets/820664/70b35d29-6e8b-4b4e-a2e7-d847f7667319">\r\n',
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/33/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/23",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/23/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/23/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/23/events",
          html_url: "https://github.com/openeval/eval/issues/23",
          id: 1904854662,
          node_id: "I_kwDOJBhfYc5xicaG",
          number: 23,
          title: "[feature] add session summary view",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-09-20T12:11:05Z",
          updated_at: "2023-09-20T12:11:05Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: "Add a screen after users submit their assessment to indicate next steps",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/23/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/18",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/18/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/18/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/18/events",
          html_url: "https://github.com/openeval/eval/issues/18",
          id: 1769112853,
          node_id: "I_kwDOJBhfYc5pcoUV",
          number: 18,
          title: "Invite assessment email",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-06-22T07:32:31Z",
          updated_at: "2023-06-22T07:32:31Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: "As a user we should be able to invite candidates to their assessments by email and keep track of their progress.  \r\n",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/18/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/16",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/16/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/16/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/16/events",
          html_url: "https://github.com/openeval/eval/issues/16",
          id: 1764762378,
          node_id: "I_kwDOJBhfYc5pMCMK",
          number: 16,
          title: "Create email templates",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-06-20T06:52:58Z",
          updated_at: "2023-10-12T17:36:09Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body:
            "Implement react.email for template emails\r\n" +
            "\r\n" +
            "https://react.email/docs/components/tailwind",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/16/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/9",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/9/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/9/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/9/events",
          html_url: "https://github.com/openeval/eval/issues/9",
          id: 1745382704,
          node_id: "I_kwDOJBhfYc5oCG0w",
          number: 9,
          title: "Add invite candidates action from assessment list",
          user: [Object],
          labels: [],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 0,
          created_at: "2023-06-07T08:49:43Z",
          updated_at: "2023-06-07T08:49:43Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: null,
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/9/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
        {
          url: "https://api.github.com/repos/openeval/eval/issues/3",
          repository_url: "https://api.github.com/repos/openeval/eval",
          labels_url:
            "https://api.github.com/repos/openeval/eval/issues/3/labels{/name}",
          comments_url:
            "https://api.github.com/repos/openeval/eval/issues/3/comments",
          events_url:
            "https://api.github.com/repos/openeval/eval/issues/3/events",
          html_url: "https://github.com/openeval/eval/issues/3",
          id: 1727057205,
          node_id: "I_kwDOJBhfYc5m8M01",
          number: 3,
          title: "Migrate API handlers to Nextjs Server actions",
          user: [Object],
          labels: [Array],
          state: "open",
          locked: false,
          assignee: null,
          assignees: [],
          milestone: null,
          comments: 1,
          created_at: "2023-05-26T07:28:27Z",
          updated_at: "2023-10-26T08:49:48Z",
          closed_at: null,
          author_association: "MEMBER",
          active_lock_reason: null,
          body: "Nextjs server actions are in alpha preview : https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions  we can start migrating api handlers ",
          reactions: [Object],
          timeline_url:
            "https://api.github.com/repos/openeval/eval/issues/3/timeline",
          performed_via_github_app: null,
          state_reason: null,
          score: 1,
        },
      ],
    });
  }),
];
